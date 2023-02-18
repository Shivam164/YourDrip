from locale import normalize
import tensorflow as tf
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from keras.layers import GlobalMaxPooling2D
import cv2
import numpy as np
from numpy.linalg import norm
import pickle
from sklearn.neighbors import NearestNeighbors

print(tf.__version__)

# feature_list = np.array(pickle.load("featurevector.pkl", 'rb'))
# filename = np.array(pickle.load("filenames.pkl", 'wb'))


# model = ResNet50(weights = 'imagenet', include_top = False, input_shape=(224, 224, 3))
# model.trainable = False


# model = tf.keras.Sequential([
#     model,
#     GlobalMaxPooling2D()
# ])

# model.summary()



# ## defining function

# def extract_feature(image_path, model):
#     img = cv2.imread(image_path)
#     img = cv2.resize(img, (224, 224))
#     img = np.array(img)
#     expand_img = np.expand_dims(img, axis = 0)
#     prepro_img = preprocess_input(expand_img)
#     result = model.predict(prepro_img).flatten()
#     normalized = result/norm(result)
#     return normalized


# nn = NearestNeighbors(n_neighbours = 6, algorithm = 'brute', metric = 'euclidean')
# nn.fit(feature_list)

# distance, indices = nn.kneighbors([normalized])

# for file in indices[0][1:6]:
#     image = cv2.inread(filenmae[file]) 
#     cv2.imshow("Frame", cv2.resize(image, (640, 480))) 
#     cv2.waitKey(0)

