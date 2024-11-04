# Capeasy

Implementation of a web application that converts a video into a spatial image

---

# 프로젝트 개요

- 특정 공간에서 촬영한 동영상을 모든 방향에서 해당 공간을 볼 수 있는 파노라마 형태의 구(球)형 이미지인 공간 이미지로 변환하는 서비스
- 사용자가 생성한 공간 이미지를 가상 현실 플랫폼의 배경으로 사용할 수 있게 다운로드할 수 있는 서비스
- 사용자가 생성한 공간 이미지를 활용하여 게시글 작성을 통해 손쉽게 공유할 수 있는 서비스
- 게시글에 추천 및 댓글 기능을 통해 다른 사용자와 상호작용할 수 있는 서비스

 ---

 ## 연관 프로젝트
- Backend API Server: [vp-api-server](https://github.com/juintination/vp-api-server)
- Stitching API Server: [stitching-api-server](https://github.com/WellshCorgi/stitching-api-server)

## 목차

- [사용 방법](#사용-방법)
- [실행 화면과 기능 설명](#실행-화면과-기능-설명)

 ---

## 사용 방법



1. Git clone repository

```
git clone https://github.com/iseungho/Capeasy.git

cd Capeasy
```

2. Generate `.env` file

```
# 윈도우의 경우

echo REACT_APP_SERVER_URL=your_back_end_api_server_url > .env
```

```
# Unix-like 시스템(Linux, macOS)의 경우

echo "REACT_APP_SERVER_URL=your_back_end_api_server_url" > .env
```

3. Install modules

```
npm install
```

4. Run application

```
npm start
```

 ---

## 실행 화면과 기능 설명

### 메인 페이지

<img width="1674" alt="main" src="https://github.com/user-attachments/assets/d6473139-1ab4-4393-a283-f1bbbbc34ff2">

가운데 'Get Started' 버튼을 통해 공간 이미지 제작 서비스를 이용할 수 있습니다.
- 상단 메뉴바에서 Comunity를 선택하면 제작된 공간 이미지 기반의 게시물 리스트를 볼 수 있습니다.
- About을 선택하면 서비스의 기술적인 내용을 확인할 수 있습니다.

- 우측 상단에 Login 버튼을 통해 회원가입 및 로그인을 진행할 수 있으며, 로그인이 완료된 경우에는 프로필 이미지가 표시됩니다.
- 로그인이 완료된 이후에 프로필 이미지를 선택하면 마이페이지로 이동하거나 로그아웃을 진행할 수 있습니다.

### 사용 방법

<img width="1921" alt="howto1" src="https://github.com/user-attachments/assets/59a3affe-0bce-400b-886e-c40bba377746">

<img width="1921" alt="howto2" src="https://github.com/user-attachments/assets/9ff59661-d418-4222-8086-c4df3834b9ac">

<img width="1921" alt="introduce1" src="https://github.com/user-attachments/assets/1994697b-2369-411f-a91b-19cc65cf1bcc">

<img width="1921" alt="introduce2" src="https://github.com/user-attachments/assets/a606d84f-d90a-4550-aa9d-c704685e7b12">

<img width="1921" alt="introduce3" src="https://github.com/user-attachments/assets/af454acd-9b42-4699-9f2f-8a77e9ee58be">

메인 페이지에서 스크롤을 아래로 내리면 서비스 사용 방법에 대해 설명하는 간단한 만화를 볼 수 있습니다.

### 회원가입 및 로그인 모달

<img width="1674" alt="signup" src="https://github.com/user-attachments/assets/fe14df15-822c-409d-b044-aaf06594b82b">

<img width="1674" alt="signin" src="https://github.com/user-attachments/assets/01ca6544-cf94-4afd-83a3-3c1295c94726">

카카오 및 네이버 계정 기반 회원가입 및 로그인은 현재 지원하지 않습니다.

### 동영상 입력

<img width="1674" alt="create0" src="https://github.com/user-attachments/assets/f01a3418-0795-44d1-9fa3-0fe83799fc13">

<img width="1674" alt="create4" src="https://github.com/user-attachments/assets/62bd058c-50b7-4cf5-9079-3b511218bbc7">

동영상을 선택하거나 드래그하여 입력할 수 있습니다.
- 동영상 외 다른 형식의 파일을 업로드 할 수 없습니다.
- 공간 이미지로 변환하기 전에 올린 영상을 미리보기 할 수 있습니다.
- 추억 제작하기 버튼을 클릭하여 공간 이미지로 변환할 수 있습니다.

### 변환 결과

<img width="1674" alt="result" src="https://github.com/user-attachments/assets/aeb86bff-9c12-4a33-a8c6-3872055ff9df">

동영상을 공간 이미지로 변환이 완료된 결과 화면입니다.
- VIEW360 뷰어를 통해 VR 환경에서 감상할 수 있습니다.
- 다운로드 버튼을 클릭하여 해당 공간 이미지를 저장할 수 있습니다.
 - 저장된 공간 이미지는 가상 현실 플랫폼의 배경으로 사용할 수 있습니다.
- 게시글 작성 버튼을 클릭하여 해당 공간 이미지 기반의 게시글을 작성할 수 있습니다.

### 게시글 작성

<img width="1674" alt="write" src="https://github.com/user-attachments/assets/e35d1406-5963-4928-929a-b2d805fbb676">

게시글에 사용되는 이미지는 변경할 수 없으며, 제목 및 내용을 입력할 수 있습니다.

### 게시글 리스트

<img width="1674" alt="board-list2" src="https://github.com/user-attachments/assets/b7c19cf4-2a34-440a-9dc3-487ba4e8c42b">

이렇게 작성된 게시글은 Community 탭에서 확인이 가능합니다.

### 게시글 관련 상호작용

<img width="1674" alt="board" src="https://github.com/user-attachments/assets/983354ad-8fa2-4326-a392-690311a4514e">

게시글 추천 및 댓글 기능을 통해 다른 사용자와 상호작용할 수 있습니다.

### 마이 페이지

<img width="1674" alt="mypage" src="https://github.com/user-attachments/assets/f6e36f29-c129-4ae7-b9f4-0aaeb20375d4">

마이 페이지에서 사용자가 작성한 게시글을 확인할 수 있습니다.
- 프로필 이미지를 클릭하여 프로필 이미지를 변경할 수 있습니다.
- 회원정보 수정 버튼을 클릭하여 사용자의 이메일, 비밀번호, 닉네임을 변경할 수 있습니다.

---

## 기타 사항

- 사용언어 및 개발환경 : <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white"> <img src="https://img.shields.io/badge/WebStorm-000000?style=for-the-badge&logo=WebStorm&logoColor=white"> <img src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white"> <img src ="https://img.shields.io/badge/HTML5-E34F26.svg?&style=for-the-badge&logo=HTML5&logoColor=white"/> <img src ="https://img.shields.io/badge/JavaScriipt-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=black"/> <img src ="https://img.shields.io/badge/CSS3-1572B6.svg?&style=for-the-badge&logo=CSS3&logoColor=white"/> <img src ="https://img.shields.io/badge/Tailwind CSS-06B6D4.svg?&style=for-the-badge&logo=Tailwind CSS&logoColor=white">

