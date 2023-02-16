from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
import json
from django.core.cache import cache




@api_view(['GET'])
def getAllCacheQueries(request):
    try:
        #Works only when redis server is on
        if cache.keys('*'):
                data=[]
                for key in cache.keys('*'):
                    data=data+cache.get(key)
                print("Lendata",len(data))
                return Response({"data":data,"status":True})
        
        else:
             #if server is on but cache is empty
             return Response({"status":False})            
    except:
         #if redis server is off
         return Response({"status":False})



@api_view(['GET'])
def getAllQueries(request):

    question=request.query_params.get('key')
    try:
        if cache.get(question):
            print("Cache Is Fired")
            data=cache.get(question)
            print(question)
            return Response({"data":data,"status":True,"questionAsked":question})
        else:
        
            url = 'https://api.stackexchange.com/2.3/search/advanced?title='+question+'&site=stackoverflow'
            print(url)
            data=requests.get(url)
            cache.set(question,data.json()["items"])
            print("Fired From Api")
            print("len data",len(data.json()["items"]))
            return Response({"data":data.json()["items"],"status":True,"questionAsked":question})
    except:
        return Response({"status":False})




