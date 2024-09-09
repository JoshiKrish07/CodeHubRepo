import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uid?: string;
  constructor(private toastr: ToastrService, private toaster: ToastrService, private router: Router,) { 
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        console.log("user logged in as ", user.email);
      } else {
        this.uid = undefined;
        console.log("user logged out");
      }
    });
  }

  isAuthenticated() {
    return this.uid ? true : false;
  }

  getUid() {
    return this.uid;
  }

  registerUser(email: any, password: any) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      this.toaster.success("Registered Succesfully");
      this.router.navigate(['/login']);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("===errorCode====>",errorCode,"==errorMessage==>", errorMessage);
      this.toastr.error("Something went wrong while signup");
    });
    }

    // login user authentication
    loginUser(email: any, password: any) {

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        this.toastr.success("Login Successfully");
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.toastr.error("Something went wrong while signin");
      });
  }

  logOutUser() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.toastr.success("LogOut Successfully");
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.toastr.error("Something went wrong while logout");
    });
  }

}
