from flask import request, jsonify
from config import app, db
from models import Expense

@app.route("/expenses", methods=["GET"])
def get_expenses():
  expenses = Expense.query.all()
  json_expenses = list(map(lambda x: x.to_json(), expenses))
  return jsonify({"expenses": json_expenses})

@app.route("/create_expense", methods=["POST"])
def create_expense():
  name = request.json.get("name")
  type = request.json.get("type")
  amount = request.json.get("amount")

  if not name or not type or not amount:
    return (
      jsonify({"message": "Expense must have a name, type and amount"}),
      400
    )

  new_expense = Expense(name=name, type=type, amount=amount)
  try:
    db.session.add(new_expense)
    db.session.commit()
  except Exception as e:
    return jsonify({"message": str(e)}), 400

  return jsonify({"message": "Expense created!"}), 201

@app.route("/remove_expense/<int:expense_id>", methods=["DELETE"])
def remove_expense(expense_id):
  expense = Expense.query.get(expense_id)

  if not expense:
    return jsonify({"message": "Expense not found"}), 404

  db.session.delete(expense)
  db.session.commit()

  return jsonify({"message": "Expense deleted!"}), 200


if __name__ == "__main__":
  with app.app_context():
    db.create_all()

  app.run(debug=True)
