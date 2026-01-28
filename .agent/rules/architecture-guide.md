---
trigger: always_on
---

# Project Context
- **Project Name:** Haeyeon Lee's Promotion Page
- **Stack:** Vanila HTML/CSS/JS, Github Pages, Minified HTML/CSS/JS
- **Spec File:** specs/spec.md (이 명세를 진실 공급원으로 삼으세요)

# Architecture Rules
- SPA는 지양합니다.
- 복수의 메뉴가 있는 경우 frontend routing을 이용합니다. Frontend routing은 개별 페이지 URL을 브라우저에 입력할 경우 해당 페이지가 뜨도록 합니다.
- 개별 페이지는 Sitemap.xml에 기록합니다.
- Github Pages에서는 Minified 된 HTML, CSS, JS를 사용해 웹페이지를 호스팅합니다.

# Testing
- 개별 페이지 URL을 브라우저에 입력할 경우 해당 페이지가 뜨는지 확인
- 브라우저 내 페이지 전환 히스토리(back, forward)가 잘 기록되고, 버튼을 눌렀을 때 히스토리대로 작동하는지 확인

# Error Handling
- 모든 서버 에러 (404, 500 등) 관련해서 에러 처리 / redirection 로직이 포함되어야 합니다.

# HTML
- HTML 작성 시 SEO를 고려해야 합니다.

# FAVICON
- favicon이 resources 폴더에 없을 경우 임의로 만듭니다.

# Documentation
- Spec이 변경되면 task.md와 plan.md를 그에 맞게 수정합니다.
- 사용자 코멘트에 따라 수정사항이 생길 경우 해당 내용을 spec.md에 업데이트합니다.

# Image Resource Path
- resources/img 폴더 내 이미지를 사용합니다.