from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login_view, name='login'),
    path('create_meeting/', views.create_meeting, name='create_meeting'),
    path('add_participant/', views.add_participant, name='add_participant'),
    path('bulk_add_participants/', views.bulk_add_participants, name='bulk_add_participants'),
    path('export_ics/<int:meeting_id>/', views.export_ics, name='export_ics'),

]

