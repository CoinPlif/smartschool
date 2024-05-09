from rest_framework import serializers

from users.models import SchoolWorkers, Parents


class SchoolWorkersSerializers(serializers.ModelSerializer):
    class Meta:
        model = SchoolWorkers
        fields = "__all__"


class ParentsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Parents
        fields = "__all__"
