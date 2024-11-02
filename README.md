# CAPEASY: VR 공간 이미지 제작 서비스

본 프로젝트는 사용자가 특정 공간에서 촬영한 동영상을 활용하여 모든 방향에서 해당 공간을 볼 수 있는 “파노라마 형태의 구(球)형 이미지”로, 가상 현실의 배경으로 적합한 “공간 이미지”를 생성하는 서비스이다. 해당 서비스는 웹 애플리케이션으로 제공되며, 사용자가 생성한 공간 이미지를 손쉽게 공유하고 다른 사용자와 상호작용할 수 있는 기능을 지원합니다. 

 공간 이미지를 생성하는 과정은 동영상에서 추출된 프레임에 자체 개발한 이미지 초해상화 모델을 적용한 후 이미지 스티칭 기술을 사용하여 이루어집니다. 해당 모델은 기존 SRCNN 모델에 추가적인 레이어를 적용하고 더 많은 데이터를 학습하여 개발되었으며, 이를 통해 이미지 스티칭 품질을 개선하여 보다 왜곡이 최소화된 고해상도 공간 이미지를 제공하는 것에 기여합니다.

 
![image](https://github.com/user-attachments/assets/53e4e1b5-632e-4714-9161-f0d3cdc23560)




 ---

## 핵심 기술 및 솔루션

#### 1. 영상 프레임 기반 이미지 스티칭

영상에서 개별 프레임을 추출하고, 이를 바탕으로 이미지 스티칭을 수행하여 왜곡이 최소화된 파노라마 이미지를 생성합니다.
다양한 시점에서 촬영된 영상을 효과적으로 결합하여 넓은 범위의 장면을 표현할 수 있습니다.

영상에서 프레임을 추출하여 겹침 영역을 정렬하고, 특징점을 기반으로 각 프레임을 결합합니다. 이를 통해 영상의 왜곡 문제를 최소화하며 높은 정확도로 스티칭을 수행할 수 있습니다.

![image](https://github.com/user-attachments/assets/19594760-5a2c-4f3a-bdf3-d7c92fb5d439)

#### 2. SRCNN-PANO

기존 SRCNN 기술의 성능을 유지하면서 모델 적용 시간을 감소시킨 SRCNN-PANO를 사용하여 고품질의 이미지를 빠르게 생성합니다.
일반적인 고해상도 이미지 생성 및 확대 작업에 활용될 수 있습니다.

SRCNN 구조를 기반으로 하되 파노라마 이미지에 적합한 최적화를 거친 모델로, 더 빠른 처리 시간을 보장합니다.

![image](https://github.com/user-attachments/assets/f77a3817-16a3-4be7-9e39-5939cdd4ff32)
![image](https://github.com/user-attachments/assets/82c9f35f-f517-4909-bf3c-7fcaa6277f1c)

---


## 연관 프로젝트
#### vp-api-server: <https://github.com/WellshCorgi/stitching-api-server.git>
#### stitching-api-server: <https://github.com/juintination/vp-api-server.git>

---

## 프로세스 및 실행 과정

![image](https://github.com/user-attachments/assets/3fbaf639-1035-48b2-9be6-380f2a989d58)
![image](https://github.com/user-attachments/assets/de95e18a-32c5-4cd4-be0f-a902c7ad636a)

---

## 관련 대외활동
![image](https://github.com/user-attachments/assets/7e58f4f0-fbc5-4299-9793-566e7588d21e)
![image](https://github.com/user-attachments/assets/f2ae923a-c00c-47ed-b6ee-dab403e93e78)
![image](https://github.com/user-attachments/assets/fb6c8164-3e5d-4042-8be5-f3ce6856f349)
