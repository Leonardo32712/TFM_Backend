import { firebaseAdminApp } from "..";
import { isValidEmail } from "../entities/user_firebase_auth";
import { User_firebase_auth } from "../entities/user_firebase_auth";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

export class FirebaseAuth {

    constructor(){
    }

    public createUser(user: User_firebase_auth): Promise<UserRecord> {
        if(!isValidEmail(user.email))
            return Promise.reject({
                code: 'backend/invalid-email',
                message: 'The provided email has an invalid format'
            })
    
        return firebaseAdminApp.auth().createUser(user)
    }
    
    public verifyIdToken(idToken: string): Promise<DecodedIdToken>{
        return firebaseAdminApp.auth().verifyIdToken(idToken)
    }

    public updateUser(uid: string, user: User_firebase_auth){
        return firebaseAdminApp.auth().updateUser(uid, user)
    }

    public deleteUser(uid: string){
        return firebaseAdminApp.auth().deleteUser(uid)
    }
}