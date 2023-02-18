from distutils.command.upload import upload
import streamlit as st
import os
from PIL import Image
import numpy as np
import pickle
import tensorflow as tf
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from sklearn.neighbors import NearestNeighbors
from numpy.linalg import norm
import cv2


feature_list = np.array(pickle.load("featurevector.pkl", 'rb'))
filename = np.array(pickle.load("filenames.pkl", 'wb'))


model = ResNet50(weights = 'imagenet', include_top = False, input_shape=(224, 224, 3))
model.trainable = False


model = tf.keras.Sequential([
    model,
    GlobalMaxPooling2D()
])

model.summary()

st.title("Man and Women Fashion Recommender System")


## create uploads file and when user will upload a file it will get save into uploads folder

def save_uploaded_file(uploaded_file):
    try:
        with open(os.path.join('uploads', uploaded_file.name), 'wb') as f:
            f.write(uploaded_file.getbuffer())
        return 1 
    except:
        return 0




## defining function

def extract_feature(image_path, model):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (224, 224))
    img = np.array(img)
    expand_img = np.expand_dims(img, axis = 0)
    prepro_img = preprocess_input(expand_img)
    result = model.predict(prepro_img).flatten()
    normalized = result/norm(result)
    return normalized


## function for recommendation

def recommend(features, feature_list):
    neighbors = NearestNeighbors(n_neighbors = 6, algorithm = 'brute',
                                  metric = 'euclidean')
    neighbors.fit(feature_list)

    distance, indices = neighbors.Kneighbors([features])

    return indices


## File Upload and then save

uploaded_file  = st.file_uploader("Choose an Image")

print(uploaded_file)

if uploaded_file is not None:
    if save_uploaded_file(uploaded_file):
        #display the image
        display_image =Image.open(uploaded_file)
        resized_img = display_image.resize((200, 200))
        st.image(resized_img)

        ## Feature Extract
        features = extract_feature(os.path.join("uploads", uploaded_file.name), model)

        ## recommendation
        indices = recommend(features, feature_list) 
        # show
        col1, col2, col3, col4, col5 = st.columns(5)


        with col1:
            st.image(filename[indices[0][0]])
        with col2:
            st.image(filename[indices[0][1]])
        with col3:
            st.image(filename[indices[0][2]])
        with col4:
            st.image(filename[indices[0][3]])
        with col5:
            st.image(filename[indices[0][4]])
     
    else:
        st.header("Some error occured in file upload")



