import firebaseDB from '../../databases/firebase';

class BaseFirebaseRepository {
    protected queryBuilder: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

    constructor(collection: string) {
        this.queryBuilder = firebaseDB.collection(collection);
    }
}

export default BaseFirebaseRepository;