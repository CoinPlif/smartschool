# Generated by Django 3.2.16 on 2024-05-29 13:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_parents_parents_surname'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cards',
            name='cards_owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.parents', verbose_name='Родитель, владелец карты'),
        ),
        migrations.AlterField(
            model_name='parents',
            name='parents_surname',
            field=models.CharField(max_length=31, verbose_name='Фамилия родителя'),
        ),
    ]