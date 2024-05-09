from django.db import models


from .constants import (LOGIN_LENGTH, PASSWORD_LENGTH)


class Cards(models.Model):
    cards_number = models.IntegerField(max_length=LOGIN_LENGTH,
                                       verbose_name="Номер банковской карты")
    cards_cvv = models.IntegerField(max_length=LOGIN_LENGTH,
                                    verbose_name="Логин администратора")
    cards_expiry = models.CharField(max_length=LOGIN_LENGTH,
                                    verbose_name="Логин администратора")

    class Meta:
        verbose_name = "Карты"

    def __str__(self):
        return f"cards_number = {self.cards_number}"


class Administrators(models.Model):
    administrators_login = models.CharField(max_length=LOGIN_LENGTH,
                                            verbose_name="Логин администратора")
    administrators_password = models.CharField(max_length=PASSWORD_LENGTH,
                                               verbose_name="Пароль администратора")

    class Meta:
        verbose_name = "Администратор"

    def __str__(self):
        return f"administrators_login = {self.administrators_login}"


class Parents(models.Model):
    parents_login = models.CharField(max_length=LOGIN_LENGTH,
                                     verbose_name="Логин родителя")
    parents_name = models.CharField(max_length=LOGIN_LENGTH,
                                    verbose_name="Имя родителя")
    parents_password = models.CharField(max_length=PASSWORD_LENGTH,
                                        verbose_name="Пароль родителя")
    administrators_id = models.ForeignKey(Administrators,
                                          on_delete=models.CASCADE,
                                          verbose_name="id администратора, заносившего пользователя")
    card_id = models.ForeignKey(Cards,
                                on_delete=models.CASCADE,
                                verbose_name="Номер карты родителя родителя")

    class Meta:
        verbose_name = "Родители"

    def __str__(self):
        return f"parents_login = {self.parents_login}"


class Children(models.Model):
    children_name = models.CharField(max_length=PASSWORD_LENGTH,
                                     verbose_name="Имя ребенка")
    parents_id = models.ForeignKey(Parents,
                                   on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Дети"

    def __str__(self):
        return f"children_name = {self.children_name}"


class SchoolWorkers(models.Model):
    schoolworkers_login = models.CharField(max_length=LOGIN_LENGTH,
                                           verbose_name="Логин работника учреждения")
    schoolworkers_password = models.CharField(max_length=PASSWORD_LENGTH,
                                              verbose_name="Пароль работника учреждения")
    administrators_id = models.ForeignKey(Administrators,
                                          on_delete=models.CASCADE,
                                          verbose_name="id администратора, заносившего пользователя")

    class Meta:
        verbose_name = "Работники школы"

    def __str__(self):
        return f"schoolworkers_login = {self.schoolworkers_login}"



