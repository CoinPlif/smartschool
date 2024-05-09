from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets

from users.models import SchoolWorkers, Parents


class SchoolWorkersViewSet(viewsets.ModelViewSet):
    queryset = SchoolWorkers.objects.all()


class ParentsViewSet(viewsets.ModelViewSet):
    queryset = Parents.objects.all()
