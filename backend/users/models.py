from django.db import models


from .constants import (LOGIN_LENGTH, PASSWORD_LENGTH, CARD_LENGTH, CVV_LENGTH)


class Cards(models.Model):
    cards_number = models.CharField(max_length=CARD_LENGTH,
                                    null=False,
                                    verbose_name="Номер банковской карты")

    cards_cvv = models.CharField(max_length=CVV_LENGTH,
                                 null=False,
                                 verbose_name="CVV карты")

    cards_expiry = models.CharField(max_length=LOGIN_LENGTH,
                                    null=False,
                                    verbose_name="Срок карты")

    class Meta:
        verbose_name = "Карты"

    def __str__(self):
        return f"{self.cards_number}"


class Administrators(models.Model):
    administrators_login = models.CharField(max_length=LOGIN_LENGTH,
                                            default="admin",
                                            null=False,
                                            verbose_name="Логин администратора")

    administrators_password = models.CharField(max_length=PASSWORD_LENGTH,
                                               default="admin",
                                               null=False,
                                               verbose_name="Пароль администратора")

    class Meta:
        verbose_name = "Администратор"

    def __str__(self):
        return f"{self.administrators_login}"


class Parents(models.Model):
    parents_login = models.CharField(max_length=LOGIN_LENGTH,
                                     null=False,
                                     verbose_name="Логин родителя")

    parents_name = models.CharField(max_length=LOGIN_LENGTH,
                                    null=False,
                                    verbose_name="Имя родителя")

    parents_password = models.CharField(max_length=PASSWORD_LENGTH,
                                        null=False,
                                        verbose_name="Пароль родителя")

    card_id = models.ForeignKey(Cards,
                                null=True,
                                on_delete=models.CASCADE,
                                verbose_name="Номер карты родителя родителя")

    class Meta:
        verbose_name = "Родители"

    def __str__(self):
        return f"{self.parents_login}"


class Children(models.Model):
    children_name = models.CharField(max_length=PASSWORD_LENGTH,
                                     verbose_name="Имя ребенка")

    parents_id = models.ForeignKey(Parents,
                                   on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Дети"

    def __str__(self):
        return f"{self.children_name}"


class SchoolWorkers(models.Model):
    schoolworkers_login = models.CharField(max_length=LOGIN_LENGTH,
                                           null=False,
                                           verbose_name="Логин работника учреждения")

    schoolworkers_password = models.CharField(max_length=PASSWORD_LENGTH,
                                              null=False,
                                              verbose_name="Пароль работника учреждения")

    class Meta:
        verbose_name = "Работники школы"

    def __str__(self):
        return f"{self.schoolworkers_login}"
