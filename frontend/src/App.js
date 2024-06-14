import './App.css';
import {useRef, useState} from "react";

function App() {
    const backendBaseUrl = 'http://localhost:3001/'
    const [photoIdGet, setPhotoIdGet] = useState('');
    const [photoIdUpdate, setPhotoIdUpdate] = useState('');
    const [photoIdDelete, setPhotoIdDelete] = useState('');
    const [photoTitle, setPhotoTitle] = useState('');
    const [photoDescription, setPhotoDescription] = useState('');
    const [imageSources, setImageSources] = useState([
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIT_T6lwEr_0HyWaIRuCvqCiSt91QPIItwqA&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgSVMLJAybwkPi2a8EjrNSjQySErCvnOH1Kg&s',
        'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    ]);
    const [error, setError] = useState('');
    const file = useRef(null);

    async function getPhotoById() {
        try {
            if (photoIdGet === '') {
                setError('Please set an ID');
                return;
            }
            setError('');
            const response = await fetch(`${backendBaseUrl}photos/${photoIdGet}/`);
            // console.log("respnse:", response);
            const json = await response.json();
            setImageSources([URL.createObjectURL(json.file)])
            console.log("json:", json);
        } catch(e) {
            console.log("error:", e);
            setError('There was an error');
        }
    }

    async function getAllPhotos() {
        try {
            setError('');
            const response = await fetch(`${backendBaseUrl}photos/`);
            // console.log("respnse:", response);
            const json = await response.json();
            setImageSources(json.map(photo => URL.createObjectURL(photo.file)))
            console.log("json:", json);
        } catch(e) {
            console.log("error:", e);
            setError('There was an error');
        }
    }

    async function updatePhoto() {
        try {
            if (photoIdUpdate === '') {
                setError('Please set an ID');
                return;
            }
            setError('');
            const response = await fetch(`${backendBaseUrl}photos/${photoIdUpdate}/`, {
                method: 'PUT',
            });
            const json = await response.json();
            console.log("json:", json);
        } catch(e) {
            console.log("error:", e);
            setError('There was an error');
        }
    }

    async function deletePhoto() {
        try {
            if (photoIdDelete === '') {
                setError('Please set an ID');
                return;
            }
            setError('');
            const response = await fetch(`${backendBaseUrl}photos/${photoIdDelete}/`, {
                mode: 'no-cors',
                method: 'DELETE',
            });
            const json = await response.json();
            console.log("json:", json);
        } catch(e) {
            console.log("error:", e);
            setError('There was an error');
        }
    }

    async function savePhoto() {
        try {
            if (photoTitle === '') {
                setError('Please set a title');
                return;
            }
            if (photoDescription === '') {
                setError('Please set a description');
                return;
            }
            if (file.current == null) {
                setError('Please upload a photo');
                return;
            }
            setError('');

            const formData = new FormData();
            formData.append('title', photoTitle);
            formData.append('description', photoDescription);
            formData.append('file', file.current);

            const response = await fetch(`${backendBaseUrl}photos/`, {
                method: 'POST',
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body: formData,
            });
            console.log('response:', response);
        } catch(e) {
            console.log('error:', e);
            setError('There was an error');
        }
    }

    return (
        <div>
            <div>
                <input
                    type='text'
                    id='photoIdCreate'
                    value={photoIdGet}
                    onChange={(e) => setPhotoIdGet(e.target.value)}
                    placeholder='Photo ID'
                />
                <button onClick={getPhotoById}>Get photo</button>
            </div>
            <div>
                <input
                    type='text'
                    id='photoIdUpdate'
                    value={photoIdUpdate}
                    onChange={(e) => setPhotoIdUpdate(e.target.value)}
                    placeholder='Photo ID'
                />
                <button onClick={updatePhoto}>Update photo</button>
            </div>
            <div>
                <input
                    type='text'
                    id='photoIdDelete'
                    value={photoIdDelete}
                    onChange={(e) => setPhotoIdDelete(e.target.value)}
                    placeholder='Photo ID'
                />
                <button onClick={deletePhoto}>Delete photo</button>
            </div>
            <div>
                <input
                    type='text'
                    id='photoTitle'
                    value={photoTitle}
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    placeholder='Photo title'
                />
                <input
                    type='text'
                    id='photoDescription'
                    value={photoDescription}
                    onChange={(e) => setPhotoDescription(e.target.value)}
                    placeholder='Photo description'
                />
                <input
                    type='file'
                    id='photoFile'
                    ref={file}
                    placeholder='File'
                />
                <button onClick={savePhoto}>Save photo</button>
            </div>
            <div>
                <button onClick={getAllPhotos}>Get all photos</button>
            </div>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <div>
                {imageSources.map(source => <img key={source} src={source} width={300} height={300} style={{
                    objectFit: 'cover',
                    margin: 3
                }} /> )}
            </div>
        </div>
    );
}

export default App;
