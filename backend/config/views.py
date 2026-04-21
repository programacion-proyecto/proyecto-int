from rest_framework.decorators import api_view
from rest_framework.response import response

@api_view(('GET'))
def hola(request):
    return response({
        'mensaje': 'Hola React!'
    })
    