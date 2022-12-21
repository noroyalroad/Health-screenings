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

      // console.log(typeof sigugun);
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

      let sc = 0;
      for (let i in sidoc) {
        if (hmcNm[0] === sidoc[i]) {
          sc = i;
        }
      }
      // for (let i in sigugunc) {
      //   if (sigugun === sigugunc[i]) {
      //     sic = i;
      //   }
      // }
      // console.log(sic);
      console.log(sc);

      $.ajax({
        url: "/health_list",
        type: "GET",
        cache: false,
        dataType: "json",

        data: { hmcNm: "", siDoCd: sc, siGunGuCd: "" },
        //sido 천안시  sigugu 동남구
        success: function (data) {
          console.log(data);

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
          let btnId = 0;
          let a = [];

          data.items.item.forEach(function (it, index, arr) {
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
                let name = it.hmcNm;
                let addr = it.locAddr;

                // for (let i in name) {
                //   const idx = document.createTextNode(i);
                //   icon.appendChild(idx);
                //   icon.className = "icon";
                // }

                var cnt = 0;
                btnId += 1;

                const item = document.createElement("div");
                item.className = "item";
                const icon = document.createElement("span");
                const idx = document.createTextNode(btnId);
                icon.appendChild(idx);

                const name1 = document.createElement("span");
                const Name = document.createTextNode(it.hmcNm);
                name1.appendChild(Name);
                name1.className = "name";

                let btn = document.createElement("button");
                btn.innerText = "상세보기";
                btn.className = "btn";
                btn.setAttribute("id", index);

                item.appendChild(icon);
                item.appendChild(name1);

                item.appendChild(btn);

                container.append(item);

                container.onclick = () => {
                  if (event.target.classList.contains("btn")) {
                    document.querySelector(".modal_wrap").style.display = "block";
                    document.querySelector(".modal_background").style.display = "block";

                    let a = event.target.id;
                    console.log(a);

                    // console.log(arr[a].hmcNm);
                    // console.log(arr[a].hmcTelNo);
                    // console.log(arr[a].locAddr);
                    // console.log(arr[a].mchkChrgTypeCd);
                    // console.log(arr[a].ichkChrgTypeCd);

                    if (arr[a].ichkChrgTypeCd === 1 || arr[a].ichkChrgTypeCd === 9) {
                      document.querySelector(".kids").innerText = "O";
                    } else {
                      document.querySelector(".kids").innerText = "X";
                    }
                    if (arr[a].mchkChrgTypeCd === 1 || arr[a].mchkChrgTypeCd === 9) {
                      document.querySelector(".teeth").innerText = "O";
                    } else {
                      document.querySelector(".teeth").innerText = "X";
                    }
                    if (arr[a].stmcaExmdChrgTypeCd === 1 || arr[a].stmcaExmdChrgTypeCd === 9) {
                      document.querySelector(".wee").innerText = "O";
                    } else {
                      document.querySelector(".wee").innerText = "X";
                    }

                    document.querySelector(".text").innerText = arr[a].hmcNm;
                    document.querySelector(".addr").innerText = arr[a].locAddr;
                    document.querySelector(".telno").innerText = arr[a].hmcTelNo;

                    document.querySelector(".modal_close").addEventListener("click", modalClose);

                    // modalObj.querySelector(".modal_close").addEventListener("click", () => {
                    //   modalList = document.querySelectorAll(".modal_wrap");
                    //   for (let x of modalList) {
                    //     x.style.display = "none";
                    //   }
                    //   document.querySelector(".modal_background").style.display = "none";
                    //   // const ttt = document.querySelector(".text");
                    //   // const child = document.querySelector(".testtest");
                    //   // child.parentNode.removeChild(child);
                    // });
                  }

                  function modalClose() {
                    document.querySelector(".modal_wrap").style.display = "none";
                    document.querySelector(".modal_background").style.display = "none";
                    const ttt = document.querySelector(".text");
                    // const child = document.querySelector(".testtest");
                    // child.parentNode.removeChild(child);
                  }
                };

                //   console.log(Y);
                let health_location = new naver.maps.LatLng(Y, X);
                //   console.log(health_location);

                let marker = new naver.maps.Marker({
                  map: map,
                  position: health_location,
                });

                var contentString = [
                  '<div class="iw_inner">',
                  "   <h3 id='cc'>" + name + "</h3>",
                  "   <p id='firstinfo'>" + addr + "<br />",
                  "   " + it.hmcTelNo + "<br />",

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
                  }
                });
              }
            );
          });

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
                  let tel = it.hmcTelNo;

                  var marker = new naver.maps.Marker({
                    map: map,
                    position: health_location,
                  });

                  var contentString = [
                    '<div class="iw_inner">',
                    "   <h3 id='cc'>" + name + "</h3>",
                    "   <p id='firstinfo'>" + addr + "<br />",
                    "   " + it.hmcTelNo + "<br />",

                    "   </p>",
                    "</div>",
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
