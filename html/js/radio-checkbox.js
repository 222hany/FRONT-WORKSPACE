
            //라디오버튼 이벤트 처리
            const genderResult = document.getElementById("genderResult");
            const maleRadio = document.getElementById("maleRadio");
            const femaleRadio = document.getElementById("femaleRadio");

            maleRadio.addEventListener("change", updateGenderResult);
            femaleRadio.addEventListener("change", updateGenderResult);
            otherRadio.addEventListener("change", updateGenderResult);
            
            function updateGenderResult(){
                if(maleRadio.checked){
                    genderResult.textContent = "선택된 성별 : 남성";
                }else if(femaleRadio.checked){
                    genderResult.textContent = "선택된 성별 : 여성";
                }else{
                    genderResult.textContent = "선택된 성별 : 기타";
                }
            }

            //체크박스 이벤트 처리
            const fruitsResult = document.getElementById("fruitsResult");
            const appleCheckbox = document.getElementById("appleCheckbox");
            const blueberryCheckbox = document.getElementById("blueberryCheckbox");
            const cherryCheckbox = document.getElementById("cherryCheckbox");

            appleCheckbox.addEventListener("change", updateFruitsResult);
            blueberryCheckbox.addEventListener("change", updateFruitsResult);
            cherryCheckbox.addEventListener("change", updateFruitsResult);

            //updateFruitsResult : change 이벤트가 발생할 때 실행. 현재 선택된 체크박스를 확인하고 선택된 과일 항목을 배열에 추가한다음 결과 메세지를 업데이트.
            function updateFruitsResult(){
                const selectFruits = [];        //과일을 담을 수 있는 빈 배열.
                if(appleCheckbox.checked){      //checked의 속성을 사용해서 각 체크박스의 선택 여부를 확인하고, 선택된 과일 항목을 selectFruits 배열에 추가.
                    selectFruits.push("사과");
                }
                if(blueberryCheckbox.checked){
                    selectFruits.push("블루베리");
                }
                if(cherryCheckbox.checked){
                    selectFruits.push("체리");
                }
                fruitsResult.textContent = "선택된 과일 : " + selectFruits.join(", ");
            }
