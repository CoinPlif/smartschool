# Generated by Django 3.2.16 on 2024-05-29 13:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_children_children_surname'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='parents',
            name='card_id',
        ),
        migrations.AddField(
            model_name='cards',
            name='cards_owner',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='users.parents', verbose_name='Родитель, владелец карты'),
        ),
    ]
