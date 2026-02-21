from datetime import timedelta
from .models import Participant, Meeting
from ics import Calendar, Event
from django.http import Http404
from django.core.mail import send_mail
from django.conf import settings

# Function to check if a participant has a conflict for the given meeting time
# def check_conflict(participant_email, start_time, end_time):
#     # Using a single filter query instead of chaining two
#     conflicting_meetings = Participant.objects.filter(
#         email=participant_email,
#         meeting__start_time__lt=end_time,
#         meeting__end_time__gt=start_time
#     )
#     return conflicting_meetings.exists()

def check_conflict(participant_email, start_time, end_time):
    conflicting_meetings = Participant.objects.filter(
        email=participant_email
    ).filter(
        meeting__start_time__lt=end_time,
        meeting__end_time__gt=start_time
    )
    return conflicting_meetings.exists()


# Function to generate an ICS file for a given meeting
def generate_ics(meeting_id):
    try:
        # Fetch the meeting by ID, raise Http404 if not found
        meeting = Meeting.objects.get(id=meeting_id)
    except Meeting.DoesNotExist:
        raise Http404("Meeting not found")
    
    c = Calendar()
    e = Event()
    e.name = meeting.title
    e.begin = meeting.start_time
    e.end = meeting.end_time
    e.description = meeting.description
    c.events.add(e)
    
    # Save the calendar to a string and return it
    return str(c)


# Function to send email notification
def send_email_notification(participant_email, meeting_title, meeting_start_time):
    subject = f'New Meeting Scheduled: {meeting_title}'
    message = f'A new meeting has been scheduled for {meeting_title} on {meeting_start_time}.'
    from_email = settings.EMAIL_HOST_USER

    try:
        send_mail(subject, message, from_email, [participant_email])
    except Exception as e:
        print(f'Error sending email: {e}')
