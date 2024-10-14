from config import db

class Expense(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(80), nullable=False, unique=False)
  type = db.Column(db.String(80), nullable=False)
  amount = db.Column(db.Integer, nullable=False)

  def to_json(self):
    return {
      "id": self.id,
      "name": self.name,
      "type": self.type,
      "amount": self.amount
    }
