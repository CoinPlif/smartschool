from rest_framework import serializers

from users.models import SchoolWorkers, Parents, Children


class SchoolWorkersSerializers(serializers.ModelSerializer):
    class Meta:
        model = SchoolWorkers
        fields = ('id', 'schoolworkers_login', 'schoolworkers_password')


class ParentsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Parents
        fields = ('id', 'parents_login', 'parents_password', 'parents_name')


class ChildrenSerializers(serializers.ModelSerializer):
    class Meta:
        model = Children
        fields = ('id', 'children_name', 'children_surname', 'parents_id')

    
