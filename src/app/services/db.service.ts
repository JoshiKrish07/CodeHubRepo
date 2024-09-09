import { Injectable } from '@angular/core';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { AuthService } from './auth.service';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firbaseConfig';
import { ToastrService } from 'ngx-toastr';
import { Snippet } from '../../models/snippetType';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db: any;
  app = initializeApp(firebaseConfig);
  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) {
    this.db = getFirestore(this.app);
  }

  async createSnippet(snippet: Snippet) {
    try {
      const docRef = await addDoc(collection(this.db, "snippets"), {
        ...snippet,
        by: this.authService.getUid()
      });
      console.log("Document written with ID: ", docRef.id);
      this.toastr.success("Snippet created successfully");
      this.router.navigate(['/']);
    } catch (e) {
      console.error("Error adding document: ", e);
      this.toastr.error("Something went wrong in adding snippet");
    }
  }

  async getAllSnippets() {
    let result:any = [];
    try {
      const querySnapshot = await getDocs(collection(this.db, "snippets"));
      querySnapshot.forEach((doc) => {
        result.push({id: doc.id,...doc.data()});
      });
      return result;
    } catch (error) {
      console.error("Error in getting document: ", error);
      this.toastr.error("Something went wrong in getting all snippets");
    }
  }

  async getSnippetById(docId: string) {
    const docRef = doc(this.db, "snippets", docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      this.toastr.error("No such document!");
      return {
        id: "",
        title: "not found",
        code: "not found"
      }
    }
  }
}
