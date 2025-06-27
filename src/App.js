import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import './App.css';
import Profile_page from './components/Profile_page';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import Homepage from './components/Homepage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { app } from './firebase';
import { getFirestore, collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Temp from './Temp';
import SearchResultPage from './SearchResultPage';
import UserProfile from './UserProfile';
import ImagePage from './ImagePage';
import EditProfile from './EditProfile';

const auth = getAuth(app);
const firestore = getFirestore(app);

// Firestore Functions
export const getUser = async (email, flag) => {
  const q = query(collection(firestore, "UserData"), where("email", "==", email));
  let snapshot = await getDocs(q);

  if (snapshot.empty || !snapshot.docs[0]) return null;

  const currentUserDoc = snapshot.docs[0];
  if (!currentUserDoc.exists()) return null;

  const userData = currentUserDoc.data();
  if (!userData || (userData.posts?.length === 0 && !flag)) return null;

  return currentUserDoc;
};

export const addFollower = async (email, curr) => {
  try {
    const currentUserQuery = query(collection(firestore, "UserData"), where("email", "==", curr.email));
    const currentUserSnapshot = await getDocs(currentUserQuery);
    const currentUserDoc = currentUserSnapshot.docs[0];
    const currentUserDocRef = doc(firestore, 'UserData', currentUserDoc.id);
    const currentUser = currentUserDoc.data();

    const friendQuery = query(collection(firestore, "UserData"), where("email", "==", email));
    let friendSnapshot = await getDocs(friendQuery);
    const friendDoc = friendSnapshot.docs[0];
    const friendData = friendDoc.data();
    const friendDocRef = doc(firestore, 'UserData', friendDoc.id);

    const isFollower = currentUser.following.includes(email);

    if (isFollower) {
      await updateDoc(currentUserDocRef, { following: arrayRemove(email) });
      await updateDoc(friendDocRef, { followers: arrayRemove(curr.email) });
      return false;
    } else {
      await updateDoc(currentUserDocRef, { following: arrayUnion(email) });
      await updateDoc(friendDocRef, { followers: arrayUnion(curr.email) });
      return true;
    }
  } catch (error) {
    console.error("Error updating follower: ", error);
    return false;
  }
};

export const handleImageDelete = async (email, index, title) => {
  try {
    const currentUserQuery = query(collection(firestore, "UserData"), where("email", "==", email));
    const currentUserSnapshot = await getDocs(currentUserQuery);
    const currentUserDoc = currentUserSnapshot.docs[0];
    const currentUserDocRef = doc(firestore, 'UserData', currentUserDoc.id);
    const posts = currentUserDoc.data().posts;

    if (posts.length <= index || posts[index].title !== title) return null;
    posts.splice(index, 1);

    await updateDoc(currentUserDocRef, { posts });
    const updatedDoc = await getDoc(currentUserDocRef);
    return updatedDoc.data();
  } catch (error) {
    console.error("could not delete image", error);
    return null;
  }
};

export const UserDataChangeHandler = async (about, branch, contact, profileImage, username, website, email) => {
  try {
    const currentUserQuery = query(collection(firestore, "UserData"), where("email", "==", email));
    const currentUserSnapshot = await getDocs(currentUserQuery);
    const currentUserDoc = currentUserSnapshot.docs[0];
    const currentUserDocRef = doc(firestore, 'UserData', currentUserDoc.id);

    await updateDoc(currentUserDocRef, {
      about, branch, contact, profileImage, username, website,
    });

    const updatedDoc = await getDoc(currentUserDocRef);
    alert("Changes applied successfully");
    return updatedDoc.data();
  } catch (error) {
    console.error("Could not change user data", error);
    return null;
  }
};
export const addPost = async (userDoc, title, imageLink, date) => {
  // Example logic (adjust to your Firestore schema)
  const userData = userDoc.data();
  const newPost = {
    tittle: title,
    image: imageLink,
    date: date
  };

  const updatedPosts = [...(userData.posts || []), newPost];
  await userDoc.ref.update({ posts: updatedPosts });
};

// Main App
function App() {
  const [data, setData] = useState([]);
  const [userExists, setUserExists] = useState(false);
  const [user, setUser] = useState(null);
  const [flag, setFlag] = useState(false);
  const [u, setU] = useState(null);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully.');
        setUser(null);
        setFlag(false);
        setU(null);
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  const writeData = async (username, website, email, about, contact, branch, followers, following, posts) => {
    const q = query(collection(firestore, "UserData"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(collection(firestore, 'UserData'), {
        username, website, email, about, contact, branch,
        followers, following, posts,
        profileImage: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
      });
    }

    const p = query(collection(firestore, "UserData"), where("email", "==", email));
    const k = await getDocs(p);
    setU(k.docs[0]);
    setFlag(true);
  };

  const isSubsequence = (s, t) => {
    let i = 0;
    for (let j = 0; j < t.length; j++) {
      if (s[i] === t[j]) i++;
      if (i === s.length) return true;
    }
    return i === s.length;
  };

  const handleSearch = (initial) => {
    const filtered = data.filter(obj =>
      obj.email !== user.email &&
      (isSubsequence(obj.username.toLowerCase(), initial.toLowerCase()) ||
        isSubsequence(initial.toLowerCase(), obj.username.toLowerCase()))
    );
    window.location.href = "/searchResult";
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const querySnapshot = await getDocs(collection(firestore, "UserData"));
          const dataArray = [];
          querySnapshot.forEach((doc) => {
            dataArray.push({ id: doc.id, ...doc.data() });
          });
          setData(dataArray);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        writeData("UserName", "https://www.linkedin.com", user.email, "nothing special", "1234567890", "cs-ai", [], [], []);
      } else {
        setFlag(false);
        setUser(null);
      }
    });
  }, []);

  return (
    <>
      <Routes>
        {!user || !flag || !u ? (
          <>
            <Route path="/" element={userExists ? <SignInPage func={setUserExists} /> : <SignUpPage func={setUserExists} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/Homepage" />} />
            <Route path="/add" element={<Temp />} />
            <Route path="/update" element={<Profile_page />} />
            <Route path="/Homepage" element={<Homepage curr1={u} />} />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/Post" element={<ImagePage />} />
            <Route path="/searchResult" element={<SearchResultPage />} />
            <Route path="/editProfile" element={<EditProfile />} />
          </>
        )}
      </Routes>

      {user && flag && u && (
        <div className='appdiv'>
          <Nav search={handleSearch} curr={u.data()} user={u.data()} id={u.id} />
          <p className="text-white p-4">
            Welcome, {u.data().username}! Email: {user.email}
            <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
              Log Out
            </button>
          </p>
        </div>
      )}
    </>
  );
}

export default App;
