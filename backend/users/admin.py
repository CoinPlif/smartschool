from django.contrib import admin

# Register your models here.
from users.models import Parents, Children, Administrators, SchoolWorkers, Cards

admin.site.register(Parents)
admin.site.register(Children)
admin.site.register(Administrators)
admin.site.register(SchoolWorkers)
#admin.site.register(Payments)
admin.site.register(Cards)