from django.urls import path
from . import views

urlpatterns = [
    path('create_meeting/', views.create_meeting, name='create_meeting'),
    path('add_participant/', views.add_participant, name='add_participant'),
    path('export_ics/<int:meeting_id>/', views.export_ics, name='export_ics'),
]
