from celery import Celery

celery = Celery("tasks", broker="redis://localhost:6379/0")

@celery.task
def check_expiry():
    print("Checking expired items...")


