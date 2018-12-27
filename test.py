import os


# path = os.path.dirname((os.path.abspath(__file__)))
# print(os.path.dirname(os.path.abspath(__file__)))
#
# print(os.getcwd())
path = os.path.join("public", "phu", "nguyen")
os.makedirs(path)
print(path)
