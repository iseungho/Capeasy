# CAPEASY-FE: VR 공간 이미지 제작 서비스

본 프로젝트는 사용자가 특정 공간에서 촬영한 동영상을 활용하여 모든 방향에서 해당 공간을 볼 수 있는 “파노라마 형태의 구(球)형 이미지”로, 가상 현실의 배경으로 적합한 “공간 이미지”를 생성하는 서비스입니다. 해당 서비스는 웹 애플리케이션으로 제공되며, 사용자가 생성한 공간 이미지를 손쉽게 공유하고 다른 사용자와 상호작용할 수 있는 기능을 지원합니다. 

공간 이미지를 생성하는 과정은 동영상에서 추출된 프레임에 자체 개발한 이미지 초해상화 모델을 적용한 후 이미지 스티칭 기술을 사용하여 이루어집니다. 해당 모델은 기존 SRCNN 모델에 추가적인 레이어를 적용하고 더 많은 데이터를 학습하여 개발되었으며, 이를 통해 이미지 스티칭 품질을 개선하여 보다 왜곡이 최소화된 고해상도 공간 이미지를 제공하는 것에 기여합니다.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)

 
![image](https://github.com/user-attachments/assets/53e4e1b5-632e-4714-9161-f0d3cdc23560)

---

## 연관 프로젝트
#### vp-api-server: <https://github.com/WellshCorgi/stitching-api-server.git>
#### stitching-api-server: <https://github.com/juintination/vp-api-server.git>

---

## 기능 소개

### MainPage
<img width="1674" alt="KakaoTalk_20241104_142450312" src="https://github.com/user-attachments/assets/d019b4a9-c4bc-47bc-b02f-baf680254fa4">

- 기본 메인 페이지 입니다.

- Get Started 버튼을 눌러 공간 이미지 생성을 할 수 있습니다.

- 스크롤을 내려 Capeasy의 사용방법 만화와 개발팀 종합선물세트에 대한 소개를 볼 수 있습니다.

### SignUp, LogIn
<img width="1674" alt="KakaoTalk_20241104_142450312_09" src="https://github.com/user-attachments/assets/922f98de-9545-40cc-a8a0-e7d2135c4ca5">
<img width="1674" alt="KakaoTalk_20241104_142450312_10" src="https://github.com/user-attachments/assets/3e413974-e393-44f1-806c-c6ee75ba432b">


- 회원가입과 로그인 기능을 구현하였습니다.

- 로그인 유지하기 버튼으로 로그인을 유지할 수 있습니다.

### CreatePage
<img width="1674" alt="KakaoTalk_20241104_142450312_08" src="https://github.com/user-attachments/assets/24084aa9-7b82-42f0-920b-fc5215640d7d">
<img width="1674" alt="KakaoTalk_20241104_142450312_07" src="https://github.com/user-attachments/assets/e554c0df-33f5-4cb4-8cd9-d7adc7dc8305">
<img width="1674" alt="KakaoTalk_20241104_142450312_06" src="https://github.com/user-attachments/assets/536b1958-3c28-4c4b-9735-19fb63e1b581">
<img width="1674" alt="KakaoTalk_20241104_142450312_05" src="https://github.com/user-attachments/assets/3be43a1e-8422-4ca3-a572-7b3bb91310cf">


- 동영상을 업로드 할 수 있는 페이지 입니다.

- 동영상을 드래그 하여 업로드 할 수 있습니다.

- 동영상 외 다른 파일을 업로드 할 수 없고, 올린 영상을 미리보기 할 수 있습니다.

### ResultPage, WriteModal
<img width="1674" alt="KakaoTalk_20241104_142450312_04" src="https://github.com/user-attachments/assets/5253d355-5578-4a18-a89f-fd8b747713f1">
<img width="1674" alt="KakaoTalk_20241104_142450312_03" src="https://github.com/user-attachments/assets/732b48e3-8fdd-457d-bcb9-b47bd852a65e">


- 생성 완료된 공간이미지를 VIEW360 뷰어를 이용하여 VR 환경에서 감상하실 수 있습니다.

- 생성한 공간이미지를 이용하여 커뮤니티에 게시글을 작성할 수 있습니다.

### BoardListPage
<img width="1674" alt="KakaoTalk_20241104_142450312_02" src="https://github.com/user-attachments/assets/9f44b353-1ca9-48d3-aa50-a9d1a407c6b2">

- 사람들이 작성한 공간이미지 게시글들을 둘러볼 수 있습니다.

- 공간이미지의 썸네일과 제목, 내용의 요약을 볼 수 있으며, 좋아요를 눌러 게시글을 응원할 수 있습니다.

### BoardModal
<img width="1674" alt="KakaoTalk_20241104_142450312_01" src="https://github.com/user-attachments/assets/fb2c3053-b874-48c8-bf15-78707ac84825">


- 사람들이 작성한 공간이미지 게시글을 자세히 볼 수 있습니다.

- VIEW360 뷰어를 통해 다른 사람들의 공간이미지도 VR 환경에서 감상하실 수 있습니다.

- 댓글과 좋아요 기능을 통해 작성자와 의사소통을 할 수 있습니다.


### MyPage
<img width="1674" alt="KakaoTalk_20241104_142450312_14" src="https://github.com/user-attachments/assets/8639d6e0-caa0-4d46-80b9-785cf384f2e4">


- 회원정보와 작성한 게시글들을 관리할 수 있습니다.

- 본인의 프로필 사진과 회원정보를 수정할 수 있습니다.

### UserInfomationPage
<img width="1674" alt="KakaoTalk_20241104_142450312_13" src="https://github.com/user-attachments/assets/b62b695a-cc44-40be-b56f-e40ca53b64cb">

<img width="1674" alt="KakaoTalk_20241104_142450312_12" src="https://github.com/user-attachments/assets/d7433fa6-0f23-4a0f-bbd7-5886c72a9745">

- 비밀번호와 닉네임을 변경할 수 있습니다.

- 유저의 정보를 변경하기 위해서 비밀번호를 입력받습니다.


### Profile function

- 자신의 특색을 나타낼 수 있는 프로필 이미지를 사용할 수 있습니다.


### AboutPage

- Capeasy 프로젝트의 사용 기술 설명을 한눈에 볼 수 있습니다.

- framer-motion을 사용하여 스크롤을 이동시킬때마다 감각적인 애니메이션이 재생됩니다.
