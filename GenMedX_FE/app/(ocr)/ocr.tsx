import React, { useState } from 'react';
import { 
    View, Text, Image, TouchableOpacity, 
    ActivityIndicator, StyleSheet, Alert 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const OCRScanner = () => {
    const [image, setImage] = useState<string | null>(null);
    const [text, setText] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Pick an image from the gallery
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setText(null); // Reset extracted text
            uploadImage(result.assets[0].uri);
        }
    };

    // Upload image to backend for OCR processing
    const uploadImage = async (uri: string) => {
        setLoading(true);
    
        let formData = new FormData();
        formData.append('image', {
            uri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        } as any);
    
        console.log('🔹 FormData:', formData);
    
        try {
            let response = await fetch('http://localhost:5000/api/ocr', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });
    
            let data = await response.json();
            console.log('🔹 Response:', data);
            setText(data.text || 'No text found');
        } catch (error) {
            console.error('❌ Upload failed:', error);
        } finally {
            setLoading(false);
        }
    };
    
    
    
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Pick an Image</Text>
            </TouchableOpacity>

            {image && <Image source={{ uri: image }} style={styles.image} />}

            {loading && <ActivityIndicator size="large" color="#007bff" />}

            {text && (
                <View style={styles.textContainer}>
                    <Text style={styles.textTitle}>Extracted Text:</Text>
                    <Text style={styles.text}>{text}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 250,
        height: 250,
        marginTop: 20,
        borderRadius: 10,
    },
    textContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        width: '90%',
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
});

export default OCRScanner;
