from flask import Blueprint, request, jsonify
from .models import Task, db

main = Blueprint("main", __name__)

@main.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{
        "id": t.id,
        "title": t.title,
        "description": t.description,
        "status": t.status
    } for t in tasks])

@main.route("/tasks", methods=["POST"])
def create_task():
    data = request.json
    new_task = Task(title=data["title"], description=data.get("description"))
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task created"}), 201
 
