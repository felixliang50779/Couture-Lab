from django.db import models

# models here
class ImageModel(models.Model):
    image = models.ImageField(upload_to='images/')