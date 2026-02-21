from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Meeting, Participant
from .utils import check_conflict, generate_ics, send_email_notification
import json

# View to create a new meeting
@csrf_exempt
def create_meeting(request):
    if request.method == "POST":
        data = json.loads(request.body)
        title = data.get('title')
        description = data.get('description')
        start_time = data.get('start_time')
        end_time = data.get('end_time')

        # Create a new meeting object
        meeting = Meeting.objects.create(
            title=title,
            description=description,
            start_time=start_time,
            end_time=end_time
        )

        return JsonResponse({'message': 'Meeting created successfully', 'meeting_id': meeting.id})

# View to add a participant to a meeting
@csrf_exempt
def add_participant(request):
    if request.method == "POST":
        data = json.loads(request.body)
        meeting_id = data.get('meeting_id')
        email = data.get('email')

        try:
            meeting = Meeting.objects.get(id=meeting_id)
        except Meeting.DoesNotExist:
            return JsonResponse({'error': 'Meeting not found'}, status=404)

        if Participant.objects.filter(meeting=meeting, email=email).exists():
            return JsonResponse({'error': 'Participant is already registered for this meeting'}, status=400)

        if check_conflict(email, meeting.start_time, meeting.end_time):
            return JsonResponse({'error': 'Conflict detected: Participant has another meeting during this time'}, status=400)

        participant = Participant.objects.create(
            meeting=meeting,
            email=email
        )

        # Send email notification to the participant
        send_email_notification(email, meeting.title, meeting.start_time)

        return JsonResponse({'message': 'Participant added successfully and email sent!'})

# View to export a meeting to an ICS file
@csrf_exempt
def export_ics(request, meeting_id):
    if request.method == "GET":
        try:
            ics_content = generate_ics(meeting_id)
            return JsonResponse({'ics_file': ics_content})
        except Meeting.DoesNotExist:
            return JsonResponse({'error': 'Meeting not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)