from django.db import models


class Meeting(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return self.title


class Participant(models.Model):
    meeting = models.ForeignKey(Meeting, related_name='participants', on_delete=models.CASCADE)
    email = models.EmailField()
    status = models.CharField(max_length=20, default="Pending")  # Pending, Confirmed, or Declined

    def __str__(self):
        return self.email
