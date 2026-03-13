# 🧪 NeuroOps AI Test Repository

> **Experimental environment for generating GitHub Pull Request events to test the NeuroOps AI platform.**

![Testing](https://img.shields.io/badge/Status-Testing-blueviolet.svg)
![GitHub](https://img.shields.io/badge/Platform-GitHub-181717?logo=github&logoColor=white)
![AI](https://img.shields.io/badge/Powered%20By-NeuroOps%20AI-green?logo=google-gemini&logoColor=white)

---

## 🎯 Purpose

Opening a pull request in this repository triggers the full **NeuroOps analysis pipeline**. 

This repository serves as a sandbox for developers to test system integrity by creating various pull request scenarios—ranging from clean code to intentional security vulnerabilities—to see how the AI handles them.

---

## 🔄 What Happens When You Open a PR?

The moment a Pull Request is created or updated, the following event-driven sequence is triggered:

1. **GitHub** sends a webhook to the NeuroOps backend.

2. The event is pushed into a **Redis queue**.

3. The **Worker service** fetches the PR diff.

4. The **AI model** analyzes the code for risks.

5. A **Risk score** is generated based on findings.

6. The result is stored in **MongoDB**.

7. The **Dashboard** updates instantly via SSE.

8. An **AI-generated comment** is posted directly back to the PR.

---

## 🔗 Related Repositories

| Component | Repository Link |
| :--- | :--- |
| **Backend** | [NeuroOps Backend](https://github.com/dcpro8/neuroops-backend) |
| **Frontend** | [NeuroOps Frontend](https://github.com/dcpro8/neuroops-dashboard) |

---

## 🛠 How To Test

Follow these steps to verify the pipeline:

1. **Create a new branch**

2. **Make code changes**

 * **Examples:**

    * Introduce bug
    * Inefficient code
    * Security issues

3. Open pull request
 
4. Watch the NeuroOps Dashboard update in realtime.
