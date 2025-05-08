file:///C:/Users/rajni/OneDrive/Desktop/mern%20beginner-projects/CHAT-APP/backend/node_modules/chromadb/dist/chromadb.mjs:10221
    throw new Error("embeddings and documents cannot both be undefined");
          ^

Error: embeddings and documents cannot both be undefined
    at prepareRecordRequest (file:///C:/Users/rajni/OneDrive/Desktop/mern%20beginner-projects/CHAT-APP/backend/node_modules/chromadb/dist/chromadb.mjs:10221:11) 
    at _Collection.upsert (file:///C:/Users/rajni/OneDrive/Desktop/mern%20beginner-projects/CHAT-APP/backend/node_modules/chromadb/dist/chromadb.mjs:9824:13)    
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
    at async saveAndIndexMessage (file:///C:/Users/rajni/OneDrive/Desktop/mern%20beginner-projects/CHAT-APP/backend/controller/chroma_controller.js:66:4)        
    at async Socket.<anonymous> (file:///C:/Users/rajni/OneDrive/Desktop/mern%20beginner-projects/CHAT-APP/backend/index.js:66:25)

Node.js v22.12.0
[nodemon] app crashed - waiting for file changes before starting...
