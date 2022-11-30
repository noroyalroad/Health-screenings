$(document).ready(async function () {
  let XY = await getLocation();
  // alert("위도" + XY.lat) ;
  // alert('경도'+ XY.lng );
  await naver.maps.Service.reverseGeocode(
    {
      location: new naver.maps.LatLng(XY.lat, XY.lng),
    },
    function (status, response) {
      let result = response.result;
      let items = result.items;

      let hmcNm = items[0].addrdetail.sido.split(" "); //  시도코드와 시군코드를 넣어줘서 if문 사용해서 일치
      let sigugun = items[0].addrdetail.sigugun;
      console.log(hmcNm[0]);
      console.log(sigugun);

      console.log(typeof sigugun);
      let sidoc = {
        11: "서울특별시",
        26: "부산광역시",
        27: "대구광역시",
        28: "인천광역시",
        29: "광주광역시",
        30: "대전광역시",
        31: "울산광역시",
        41: "경기도",
        42: "강원도",
        43: "충청북도",
        44: "충청남도",
        45: "전라북도",
        46: "전라남도",
        47: "경상북도",
        48: "경상남도",
        50: "제주도",
      };
      let sigugunc = {
        110: "종로구",
        140: "중구",
        170: "용산구",
        200: "성동구",
        215: "광진구",
        230: "동대문구",
        260: "중랑구",
        290: "성북구",
        305: "강북구",
        320: "도봉구",
        350: "노원구",
        380: "은평구",
        410: "서대문구",
        440: "마포구",
        470: "양천구",
        500: "강서구",
        530: "구로구",
        545: "금천구",
        560: "영등포구",
        590: "동작구",
        620: "관악구",
        650: "서초구",
        680: "강남구",
        710: "송파구",
        740: "강동구",
        110: "중구",
        140: "서구",
        170: "동구",
        200: "영도구",
        230: "부산진구",
        260: "동래구",
        290: "남구",
        320: "북구",
        350: "해운대구",
        380: "사하구",
        410: "금정구",
        440: "강서구",
        470: "연제구",
        500: "수영구",
        530: "사상구",
        710: "기장군",
        110: "중구",
        140: "동구",
        170: "서구",
        200: "남구",
        230: "북구",
        290: "수성구",
        290: "달서구",
        710: "달성군",
        110: "중구",
        140: "동구",
        170: "남구",
        185: "연수구",
        200: "남동구",
        237: "부평구",
        245: "계양구",
        260: "서구",
        710: "강화군",
        720: "옹진군",
        110: "동구",
        140: "서구",
        155: "남구",
        170: "북구",
        200: "광산구",
        110: "동구",
        140: "중구",
        170: "서구",
        200: "유성구",
        230: "대덕구",
        110: "중구",
        140: "남구",
        170: "동구",
        200: "북구",
        710: "울주군",
        110: "수원시",
        111: "수원시 장안구",
        113: "수원시 권선구",
        115: "수원시 팔달구",
        117: "수원시 영통구",
        130: "성남시",
        131: "성남시 수정구",
        133: "성남시 중원구",
        135: "성남시 분당구",
        150: "의정부시",
        170: "안양시",
        171: "안양시 만안구",
        173: "안양시 동안구",
        190: "부천시",
        195: "부천시 원미구",
        197: "부천시 소사구",
        199: "부천시 오정구",
        210: "광명시",
        220: "평택시",
        250: "동두천시",
        270: "안산시",
        271: "안산시 상록구",
        273: "안산시 단원구",
        280: "고양시",
        281: "고양시 덕양구",
        285: "고양시 일산동구",
        287: "고양시 일산서구",
        290: "과천시",
        310: "구리시",
        360: "남양주시",
        370: "오산시",
        390: "시흥시",
        410: "군포시",
        430: "의왕시",
        450: "하남시",
        460: "용인시",
        461: "용인시 처인구",
        463: "용인시 기흥구",
        465: "용인시 수지구",
        480: "파주시",
        500: "이천시",
        550: "안성시",
        570: "김포시",
        590: "화성시",
        610: "광주시",
        630: "양주시",
        650: "포천시",
        730: "여주군",
        800: "연천군",
        820: "가평군",
        830: "양평군",
        110: "춘천시",
        130: "원주시",
        150: "강릉시",
        170: "동해시",
        190: "태백시",
        210: "속초시",
        230: "삼척시",
        720: "홍천군",
        730: "횡성군",
        750: "영월군",
        760: "평창군",
        770: "정선군",
        780: "철원군",
        790: "화천군",
        800: "양구군",
        810: "인제군",
        820: "고성군",
        830: "양양군",
        110: "청주시",
        111: "청주시 상당구",
        113: "청주시 흥덕구",
        130: "충주시",
        150: "제천시",
        710: "청원군",
        720: "보은군",
        730: "옥천군",
        740: "영동군",
        745: "증평군",
        750: "진천군",
        760: "괴산군",
        770: "음성군",
        800: "단양군",
        130: "천안시",
        131: "천안시 동남구",
        133: "천안시 서북구",
        150: "공주시",
        180: "보령시",
        200: "아산시",
        210: "서산시",
        230: "논산시",
        250: "계룡시",
        710: "금산군",
        730: "연기군",
        760: "부여군",
        770: "서천군",
        790: "청양군",
        800: "홍성군",
        810: "예산군",
        825: "태안군",
        830: "당진군",
        110: "전주시",
        111: "전주시 완산구",
        113: "전주시 덕진구",
        130: "군산시",
        140: "익산시",
        180: "정읍시",
        190: "남원시",
        210: "김제시",
        710: "완주군",
        720: "진안군",
        730: "무주군",
        740: "장수군",
        750: "임실군",
        770: "순창군",
        790: "고창군",
        800: "부안군",
        110: "목포시",
        130: "여수시",
        150: "순천시",
        170: "나주시",
        230: "광양시",
        710: "담양군",
        720: "곡성군",
        730: "구례군",
        770: "고흥군",
        780: "보성군",
        790: "화순군",
        800: "장흥군",
        810: "강진군",
        820: "해남군",
        830: "영암군",
        840: "무안군",
        860: "함평군",
        870: "영광군",
        880: "장성군",
        890: "완료도군",
        900: "진도군",
        910: "신안군",
        110: "포항시",
        111: "포항시 남구",
        113: "포항시 북구",
        130: "경주시",
        150: "김천시",
        170: "안동시",
        190: "구미시",
        210: "영주시",
        230: "영천시",
        250: "상주시",
        280: "문경시",
        290: "경산시",
        720: "군위군",
        730: "의성군",
        750: "청송군",
        760: "영양군",
        770: "영덕군",
        820: "청도군",
        830: "고령군",
        840: "성주군",
        850: "칠곡군",
        900: "예천군",
        920: "봉화군",
        930: "울진군",
        940: "울릉군",
        120: "창원시",
        125: "창원시 마산합포구",
        127: "창원시 마산회원구",
        123: "창원시 성산구",
        121: "창원시 의창구",
        129: "창원시 진해구",
        170: "진주시",
        220: "통영시",
        240: "사천시",
        250: "김해시",
        270: "밀양시",
        310: "거제시",
        330: "양산시",
        720: "의령군",
        730: "함안군",
        740: "창녕군",
        820: "고성군",
        840: "남해군",
        850: "하동군",
        860: "산청군",
        870: "함양군",
        880: "거창군",
        890: "합천군",
        110: "제주시",
        130: "서귀포시",
      };
      let sc = 0;
      let sic = 0;
      for (let i in sidoc) {
        if (hmcNm[0] === sidoc[i]) {
          sc = i;
        }
      }
      for (let i in sigugunc) {
        if (sigugun === sigugunc[i]) {
          sic = i;
        }
      }
      console.log(sic);
      console.log(sc);

      $.ajax({
        url: "/health_list",
        type: "GET",
        cache: false,
        dataType: "json",

        data: { hmcNm: hmcNm[0], siDoCd: sc, siGunGuCd: "", numOfRows: "1000", pageNo: "" },
        //sido 천안시  sigugu 동남구
        success: function (data) {
          console.log(data);

          // for(let i in data){
          //     console.log(i)
          // }
          var mapDiv = document.getElementById("map"); // 'map'으로 선언해도 동일
          //옵션 없이 지도 객체를 생성하면 서울 시청을 중심으로 하는 16 레벨의 지도가 생성됩니다.
          // 성공시 건강검진병원의 정보와 네이버 맵스 출력
          var mapOptions = {
            center: new naver.maps.LatLng(XY.lat, XY.lng), // 현재 위치하고 있는 위도와 경도값을 사용해 위치이동
            zoom: 8,
          };
          var map = new naver.maps.Map(mapDiv, mapOptions);
          const $list = document.getElementById("list");
          const $info = document.getElementById("info");
          const container = document.querySelector(".container");

          data.items.item.forEach(function (it, index) {
            naver.maps.Service.geocode(
              {
                address: it.locAddr,
              },
              function (status, response) {
                if (status !== naver.maps.Service.Status.OK) {
                  return alert("Something wrong!");
                }

                var result = response.result, // 검색 결과의 컨테이너
                  items = result.items; // 검색 결과의 배열

                //   let ggg = items[0]
                //   console.log(items[0].point.x);
                //   console.log(items[0].point.y);
                //   let g2 = ggg.point;
                //   console.log(g2.x);
                let X;
                let Y;

                X = items[0].point.x;
                Y = items[0].point.y;
                let name = it.hmcNm;
                let addr = it.locAddr;

                // for (let i in name) {
                //   const idx = document.createTextNode(i);
                //   icon.appendChild(idx);
                //   icon.className = "icon";
                // }

                var cnt = 0;

                const item = document.createElement("div");
                item.className = "item";
                const icon = document.createElement("span");
                // const idx = document.createTextNode(index);
                // icon.appendChild(idx);

                const name1 = document.createElement("span");
                const Name = document.createTextNode(it.hmcNm);
                name1.appendChild(Name);
                name1.className = "name";
                let btn = document.createElement("button");
                btn.innerText = "상세보기";
                btn.className = "btn";
                const modal_wrap = document.createElement("div");
                modal_wrap.className = "modal_wrap";

                const xbutton = document.createElement("button");
                xbutton.className = "modal_close";
                xbutton.innerText = "X";
                modal_wrap.appendChild(xbutton);
                const text = document.createElement("div");
                text.className = "text";
                // const call = document.createTextNode(it.hmcTelNo);
                // text.appendChild(call);

                modal_wrap.appendChild(text);
                const call = document.createTextNode(it.hmcTelNo);
                text.appendChild(call);
                modal_wrap.appendChild(text);

                item.appendChild(icon);
                item.appendChild(name1);
                item.appendChild(btn);
                item.appendChild(modal_wrap);
                container.append(item);

                container.onclick = () => {
                  if (event.target.classList.contains("btn")) {
                    document.querySelector(".modal_wrap").style.display = "block";
                    document.querySelector(".modal_background").style.display = "block";
                  }

                  document.querySelector(".modal_close").addEventListener("click", modalClose);
                  function modalClose() {
                    document.querySelector(".modal_wrap").style.display = "none";
                    document.querySelector(".modal_background").style.display = "none";
                    // const ttt = document.querySelector(".text");
                    // const child = document.querySelector(".testtest");
                    // child.parentNode.removeChild(child);
                  }
                };

                //   console.log(Y);
                let health_location = new naver.maps.LatLng(Y, X);
                //   console.log(health_location);

                // do Something

                let marker = new naver.maps.Marker({
                  map: map,
                  position: health_location,
                });

                var contentString = [
                  '<div class="iw_inner">',
                  "   <h3 id='cc'>" + name + "</h3>",
                  "   <p>" + addr + "<br />",
                  "   </p>",
                  "</div>",
                  '<button class="btn-open-popup">' + "상세" + "</button>",
                ].join("");

                var infowindow = new naver.maps.InfoWindow({
                  content: contentString,
                  maxWidth: 440,
                  backgroundColor: "#eee",
                  borderColor: "#2db400",
                  borderWidth: 5,
                  anchorSize: new naver.maps.Size(30, 30),
                  anchorSkew: true,
                  anchorColor: "#eee",
                  pixelOffset: new naver.maps.Point(20, -20),
                });

                naver.maps.Event.addListener(marker, "click", function (e) {
                  if (infowindow.getMap()) {
                    infowindow.close();
                  } else {
                    infowindow.open(map, marker);

                    // function modalOpen() {
                    //   document.querySelector(".modal_wrap").style.display = "block";
                    //   document.querySelector(".modal_background").style.display = "block";
                    //   body.style.overflow = "hidden";
                    // }

                    // // 모달 끄기
                    // function modalClose() {
                    //   document.querySelector(".modal_wrap").style.display = "none";
                    //   document.querySelector(".modal_background").style.display = "none";
                    // }

                    // //버튼 클릭리스너 달기
                    // document.querySelector("#modal_btn").addEventListener("click", modalOpen);
                    // document.querySelector(".modal_close").addEventListener("click", modalClose);

                    // const $ddd = document.querySelector(".detail");
                    // const body = document.querySelector("body");
                    // const modal = document.querySelector(".modal");
                    // const btnopenpopup = document.querySelector(".btn-open-popup");
                    // const Close = document.querySelector(".modal-close");
                    // const back = document.querySelector("#map");
                    // const $nnn = document.getElementById("cc");
                    //   const $sh = document.createTextNode(name);

                    //   $name.appendChild($sh);

                    // btnopenpopup.addEventListener("click", function () {
                    //   modal.classList.toggle("show");

                    //   if (modal.classList.contains("show")) {
                    //     body.style.overflow = "hidden";
                    //   }
                    // });

                    // Close.addEventListener("click", (event) => {
                    //   if (event.target === Close) {
                    //     modal.classList.toggle("show");
                    //   }

                    //   if (!modal.classList.contains("show")) {
                    //     body.style.overflow = "auto";
                    //   }
                    // });
                  }
                });
              }
            );
          });
          // $list.appendChild($info);
          // container.onclick = () => {
          //   if (event.target.classList.contains("btn")) {
          //     document.querySelector(".modal_wrap").style.display = "block";
          //     document.querySelector(".modal_background").style.display = "block";
          //   }

          //   document.querySelector(".modal_close").addEventListener("click", modalClose);
          //   function modalClose() {
          //     document.querySelector(".modal_wrap").style.display = "none";
          //     document.querySelector(".modal_background").style.display = "none";
          //     const ttt = document.querySelector(".text");
          //     // const child = document.querySelector(".testtest");
          //     // child.parentNode.removeChild(child);
          //   }
          // };

          function searchAddressToCoordinate(address) {
            naver.maps.Service.geocode(
              {
                query: address,
              },
              function (status, response) {
                if (status === naver.maps.Service.Status.ERROR) {
                  return alert("Something Wrong!");
                }
                if (response.v2.meta.totalCount === 0) {
                  return alert("올바른 주소를 입력해주세요.");
                }
                var htmlAddresses = [],
                  item = response.v2.addresses[0],
                  point = new naver.maps.Point(item.x, item.y);
                if (item.roadAddress) {
                  htmlAddresses.push("[도로명 주소] " + item.roadAddress);
                }
                if (item.jibunAddress) {
                  htmlAddresses.push("[지번 주소] " + item.jibunAddress);
                }
                if (item.englishAddress) {
                  htmlAddresses.push("[영문명 주소] " + item.englishAddress);
                }

                insertAddress(item.roadAddress, item.x, item.y);
              }
            );
          }
          $("#address").on("keydown", function (e) {
            var keyCode = e.which;
            if (keyCode === 13) {
              // Enter Key
              searchAddressToCoordinate($("#address").val());
            }
          });
          $("#submit").on("click", function (e) {
            e.preventDefault();
            searchAddressToCoordinate($("#address").val());
          });
          naver.maps.Event.once(map, "init_stylemap");
          // console.log(data);

          function insertAddress(address, latitude, longitude) {
            data.items.item.forEach(function (it, index) {
              naver.maps.Service.geocode(
                {
                  address: it.locAddr,
                },
                function (status, response) {
                  if (status !== naver.maps.Service.Status.OK) {
                    return alert("Something wrong!");
                  }

                  var result = response.result, // 검색 결과의 컨테이너
                    items = result.items; // 검색 결과의 배열

                  let X;
                  let Y;

                  X = items[0].point.x;
                  Y = items[0].point.y;
                  //   console.log(X);
                  //   console.log(Y);
                  let health_location = new naver.maps.LatLng(Y, X);

                  //   console.log(health_location);
                  let name = it.hmcNm;
                  let addr = it.locAddr;

                  var marker = new naver.maps.Marker({
                    map: map,
                    position: health_location,
                  });

                  var contentString = ['<div class="iw_inner">', "   <h3>" + name + "</h3>", "   <p>" + addr + "<br />", "   </p>", "</div>"].join("");
                  var infowindow = new naver.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 440,
                    backgroundColor: "#eee",
                    borderColor: "#2db400",
                    borderWidth: 5,
                    anchorSize: new naver.maps.Size(30, 30),
                    anchorSkew: true,
                    anchorColor: "#eee",
                    pixelOffset: new naver.maps.Point(20, -20),
                  });

                  naver.maps.Event.addListener(marker, "click", function (e) {
                    if (infowindow.getMap()) {
                      infowindow.close();
                    } else {
                      infowindow.open(map, marker);

                      //   const $sh = document.createTextNode(name);

                      //   $name.appendChild($sh);
                    }
                  });
                }
              );
            });

            let map = new naver.maps.Map("map", {
              center: new naver.maps.LatLng(longitude, latitude),
              zoom: 14,
            });

            // var mapList = "";
            // mapList += "<tr>";
            // mapList += "	<td>" + address + "</td>";
            // mapList += "	<td>" + latitude + "</td>";
            // mapList += "	<td>" + longitude + "</td>";
            // mapList += "</tr>";

            // $("#mapList").append(mapList);
          }
        },

        error: function (request, status, error) {},
      });
    }
  );

  //검색정보를 테이블로 작성해주고, 지도에 마커를 찍어준다.
});

async function getLocation() {
  let XY = new Object();
  if (navigator.geolocation) {
    let promise = new Promise((resolve, rejected) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      });
    });
    let position = await promise;

    XY.lat = position.coords.latitude; //위도
    XY.lng = position.coords.longitude; //경도
  }
  return XY;
}
