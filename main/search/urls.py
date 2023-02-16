#from django.urls import path,url
from django.urls import include, re_path,path

from search.views import getAllQueries,getAllCacheQueries

urlpatterns = [

    #re_path(r'^query/(?P<question>[A-Za-z0-9]+)',  getAllQueries, name='search'),
    path(r'cache',  getAllCacheQueries, name='cache'),
    path('query/',  getAllQueries, name='search')

    
]