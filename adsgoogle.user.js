// ==UserScript==
// @name         TỔNG HỢP
// @namespace    http://tampermonkey.net/
// @version      1.3.1
// @description  Tự động tìm và cài plugin Conversios trên WordPress, tiếp tục sau khi reload
// @include      *
// @grant        GM_setValue
// @grant        GM_getValue
// @updateURL    https://raw.githubusercontent.com/thangcc07/tampermonkey-scripts/main/adsgoogle.user.js
// @downloadURL  https://raw.githubusercontent.com/thangcc07/tampermonkey-scripts/main/adsgoogle.user.js
// ==/UserScript==
(function () {
    "use strict";
    alert("abc");
    const runmailthuong = GM_getValue("runmailthuong") || false;
    const runmailedu = GM_getValue("runmailedu") || false;
    const runxmdt = GM_getValue("runxmdt") || false;
    console.log("🚀 Script Tampermonkey đã khởi động...");
  
    // Hàm chờ một khoảng thời gian
    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  
    // Hàm đợi phần tử xuất hiện
    function waitForElement(xpath) {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          const element = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;
          if (element) {
            clearInterval(interval);
            console.log(`✅ Phát hiện phần tử: ${xpath}`);
            resolve(element);
          }
        }, 500);
      });
    }
  
    // Hàm đợi phần tử xuất hiện với timeout
    function waitForElement_timeout(xpath, timeout = 30000) {
      return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          const element = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          ).singleNodeValue;
          if (element) {
            clearInterval(interval);
            console.log(`✅ Phát hiện phần tử: ${xpath}`);
            resolve(element);
          }
        }, 500);
  
        // Thêm timeout để dừng hàm sau một khoảng thời gian nhất định
        setTimeout(() => {
          clearInterval(interval);
          console.log(`⏰ Thời gian chờ đã hết: ${xpath}`);
          reject(new Error(`Không tìm thấy phần tử sau ${timeout}ms`));
        }, timeout);
      });
    }
  
    // Hàm click theo XPath với sự kiện mousedown, mouseup và click
    async function clickButtonByXPath(xpath) {
      const button = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
  
      if (button) {
          // Gửi sự kiện mousedown
          const mouseDownEvent = new MouseEvent("mousedown", {
              bubbles: true,
              cancelable: true
          });
          button.dispatchEvent(mouseDownEvent);
          console.log(`✅ Đã gửi sự kiện mousedown: ${xpath}`);
  
          // Gửi sự kiện mouseup
          const mouseUpEvent = new MouseEvent("mouseup", {
              bubbles: true,
              cancelable: true
          });
          button.dispatchEvent(mouseUpEvent);
          console.log(`✅ Đã gửi sự kiện mouseup: ${xpath}`);
  
          // Thực hiện click
          button.click();
          console.log(`✅ Đã click: ${xpath}`);
      } else {
          console.error(`❌ Không tìm thấy phần tử với XPath: ${xpath}`);
      }
  }
  
    async function open_tk() {
      (function () {
        "use strict";
        console.log("mở all tài khoản đã chạy...");
        // Tạo container cho các nút (theo chiều dọc)
        const buttonContainer = document.createElement("div");
        buttonContainer.style.position = "fixed";
        buttonContainer.style.bottom = "20px";
        buttonContainer.style.left = "20px";
        buttonContainer.style.zIndex = 9999;
        buttonContainer.style.display = "flex";
        buttonContainer.style.flexDirection = "column-reverse";
        buttonContainer.style.gap = "10px";
        buttonContainer.style.alignItems = "flex-start";
  
        const commonStyle = `
                 padding: 10px 15px;
                 color: ##000000;
                 border: none;
                 border-radius: 5px;
                 cursor: pointer;
                 box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                 font-size: 14px;
             `;
  
        const createButton = (text, color, onClick) => {
          const btn = document.createElement("button");
          btn.textContent = text;
          btn.setAttribute("style", `${commonStyle} background-color: ${color}`);
          btn.onclick = onClick;
          return btn;
        };
  
        // Nút tổng
        const openControlBtn = createButton("🔘 Open Control", "#007bff", () => {
          buttonContainer.innerHTML = "";
          buttonContainer.appendChild(closeBtn);
          buttonContainer.appendChild(copyIdBtn);
          buttonContainer.appendChild(copyidmcc);
          buttonContainer.appendChild(openButton);
          buttonContainer.appendChild(orangeButton);
          buttonContainer.appendChild(redButton);
          buttonContainer.appendChild(btnxmdt);
          buttonContainer.appendChild(cancelButton); // 👉 Thêm nút huỷ
          console.log("🔓 Mở Control Panel");
        });
  
        // Các nút chức năng
        const openButton = createButton(
          "🟢 Mở tài khoản Google Ads",
          "#28a745",
          () => {
            console.log("🟢 Đã click: Mở tài khoản Google Ads");
          }
        );
  
        const orangeButton = createButton("🟠 Chạy Mail EDU", "#fd7e14", () => {
          console.log("🟠 Đã click: Chạy Mail EDU");
          if (typeof conversios_mailedu === "function") {
            GM_setValue("runmailedu", "edu");
            conversios_mailedu();
          }
        });
        if (runmailedu === "edu") {
          conversios_mailedu();
          console.log("Đã chạy lại mail edu");
        }
  
        // Cập nhật hành động khi click vào nút "Chạy mail thường"
        const redButton = createButton("🔴 Chạy mail thường", "#dc3545", () => {
          console.log("🔴 Đã click nút conversios_mailthuong");
  
          // Lưu trạng thái vào localStorage
          localStorage.setItem("run_conversios_mailthuong", "true");
  
          // Chạy hàm ngay lập tức
          if (typeof conversios_mailthuong === "function") {
            conversios_mailthuong();
            GM_setValue("runmailthuong", "mailthuong");
          }
        });
        if (runmailthuong === "mailthuong") {
          conversios_mailthuong();
          console.log("Đã chạy lại mail thường");
        }
     
  
     // Nút "XÁC MINH DANH TÍNH (SHIFT)"
  const btnxmdt = createButton("🤖 XÁC MINH DANH TÍNH (SHIFT)", "#39ff14", () => {
    console.log("🤖ĐÃ CLICK XMDT");
  
    // Mở Control Panel
    openControlBtn.click();
  
    // Chờ một chút để chắc chắn rằng các nút đã render
    setTimeout(() => {
      // Tạo giao diện tùy chỉnh
      createCustomAddressUI();
  
      // Thực hiện điền form hoặc các hành động khác
      console.log("✅ Đã mở giao diện xác minh danh tính");
      if (typeof xmdtggadsa === "function") {
        xmdtggadsa();
      }
    }, 500);
  });
  
      
  async function createCustomAddressUI() {
          const uiContainer = document.createElement("div");
          uiContainer.id = "custom-address-ui";
          uiContainer.style.position = "fixed";
          uiContainer.style.top = "100px";
          uiContainer.style.left = "20px";
          uiContainer.style.padding = "10px";
          uiContainer.style.backgroundColor = "#fff";
          uiContainer.style.border = "1px solid #ccc";
          uiContainer.style.zIndex = "9999";
          uiContainer.style.borderRadius = "8px";
          uiContainer.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.2)";
          uiContainer.style.fontSize = "14px";
          async function createInput(labelText, id, fallbackText = "") {
            const label = document.createElement("label");
            label.textContent = labelText;
            label.style.display = "block";
            label.style.marginTop = "5px";
          
            const input = document.createElement("input");
            input.type = "text";
            input.id = id;
            input.placeholder = fallbackText;
          
            const key = id.replace("input-", "custom_");
            const storedValue = await GM_getValue(key);
            input.value = storedValue || ""; // KHÔNG gán defaultValue nữa!
          
            input.style.width = "230px";
            input.style.padding = "4px";
            input.style.marginTop = "2px";
            input.style.marginBottom = "5px";
            input.style.border = "1px solid #aaa";
            input.style.borderRadius = "4px";
          
            uiContainer.appendChild(label);
            uiContainer.appendChild(input);
          }
          // Gọi tạo input và đợi từng cái một
    await createInput("Tên công ty:", "input-company", "NHẬP TÊN CÔNG TY");
    await createInput("Địa chỉ:", "input-address", "NHẬP ĐỊA CHỈ");
    await createInput("Thành phố:", "input-city", "NHẬP THÀNH PHỐ");
    await createInput("Tiểu bang:", "input-states", "NHẬP STATES");
    await createInput("ZIP code:", "input-zip", "NHẬP POSTCODE");
    await createInput("SĐT:", "input-phone", "NHẬP MÃ DUNS(NẾU CÓ)");
      
          const runButton = document.createElement("button");
          runButton.textContent = "🔄 NHẬP ĐỊA CHỈ";
          runButton.style.marginTop = "10px";
          runButton.style.padding = "6px 10px";
          runButton.style.backgroundColor = "#4CAF50";
          runButton.style.color = "#fff";
          runButton.style.border = "none";
          runButton.style.borderRadius = "5px";
          runButton.style.cursor = "pointer";
      
          runButton.onclick = () => {
            GM_setValue("custom_company", document.getElementById("input-company").value);
            GM_setValue("custom_address", document.getElementById("input-address").value);
            GM_setValue("custom_city", document.getElementById("input-city").value);
            GM_setValue("custom_states", document.getElementById("input-states").value);
            GM_setValue("custom_zip", document.getElementById("input-zip").value);
            GM_setValue("custom_phone", document.getElementById("input-phone").value);
  
            alert("✅ Đã lưu địa chỉ tuỳ chỉnh. Gọi hàm nhap_tk() để áp dụng.");
          };
      
          uiContainer.appendChild(runButton);
          document.body.appendChild(uiContainer);
        }
  
  // Khi trang tải lại, điền lại các giá trị đã lưu từ GM_setValue vào input fields
  window.onload = () => {
    // Kiểm tra và điền lại các giá trị nếu có
    const company = GM_getValue("input-company", "NHẬP TÊN CÔNG TY");
    const address = GM_getValue("input-address", "NHẬP ĐỊA CHỈ");
    const city = GM_getValue("input-city", "NHẬP THÀNH PHỐ");
    const state = GM_getValue("input-states", "NHẬP STATES");
    const zip = GM_getValue("input-zip", "NHẬP POSTCODE");
    const phone = GM_getValue("input-phone", "NHẬP MÃ DUNS(NẾU CÓ)");
  
    document.getElementById("input-company").value = company;
    document.getElementById("input-address").value = address;
    document.getElementById("input-city").value = city;
    document.getElementById("input-states").value = state;
    document.getElementById("input-zip").value = zip;
    document.getElementById("input-phone").value = phone;
  };
  
        // 👉 Nút HUỶ TRẠNG THÁI đã lưu
    const cancelButton = createButton("⛔ Huỷ chạy", "#6f42c1", () => {
  // Xoá toàn bộ các trạng thái GM_setValue và localStorage liên quan
  GM_setValue("runmailthuong", false);
  GM_setValue("runmailedu", false);
  GM_setValue("runxmdt", false);
  alert("🚫 Đã huỷ toàn bộ trạng thái tự động!");
    });
  
        const copyIdBtn = createButton(
          "📝 Copy ID Tài khoản đơn",
          "#17a2b8",
          () => {
            console.log("📋 Đã click: Copy ID Tài khoản đơn");
            if (typeof copy_id_tkdon === "function") copy_id_tkdon();
          }
        );
  
        const copyidmcc = createButton(
          "📝 Copy ID Tài khoản trong mcc",
          "#FFD700",
          () => {
            console.log("📋 Đã click: Copy ID Tài khoản đơn");
            if (typeof copy_id_mcc === "function") copy_id_mcc();
          }
        );
  
        const closeBtn = createButton("❌ Close", "#6c757d", () => {
          // ❌ Xoá UI nhập địa chỉ nếu tồn tại
          const addressUI = document.getElementById("custom-address-ui");
          if (addressUI) {
            addressUI.remove();
            console.log("🗑️ Đã xoá custom-address-ui");
          }
        
          // 👉 Ẩn hết các nút, chỉ còn nút mở lại Control Panel
          buttonContainer.innerHTML = "";
          buttonContainer.appendChild(openControlBtn);
          console.log("🔙 Đã đóng Control Panel");
        });
  
        (async function autoRunIfNeeded() {
          const shouldRun = localStorage.getItem("run_conversios_mailthuong");
          if (shouldRun === "true") {
            console.log("🔁 Tự động chạy lại conversios_mailthuong sau reload");
            await conversios_mailthuong();
            localStorage.removeItem("run_conversios_mailthuong");
          }
        })();
  
        // Khởi tạo lần đầu
        buttonContainer.appendChild(openControlBtn);
        document.body.appendChild(buttonContainer);
  
        openButton.addEventListener("click", () => {
          const accountLinks = Array.from(
            document.querySelectorAll("a.ion-sign-in-card__account")
          )
            .map((el) => el.href)
            .filter((href) => href.includes("ads.google.com/nav/login?ocid=")) // Lọc đúng link Ads
            .filter((href, index, self) => self.indexOf(href) === index); // Bỏ trùng
  
          if (accountLinks.length > 0) {
            let index = 0;
  
            function openNext() {
              if (index < accountLinks.length) {
                const url = accountLinks[index];
                window.open(url, "_blank");
                console.log(`🔗 Opened account link [${index + 1}]: ${url}`);
                index++;
                setTimeout(openNext, 100);
              }
            }
  
            openNext();
          } else {
            alert("❌ Không tìm thấy link tài khoản Google Ads nào.");
          }
        });
  
        console.log("✅ Nút 'Mở tài khoản Google Ads' đã được thêm vào.");
      })();
    }
  
    async function click_quocgia() {
      const setting = await waitForElement("//i[text()='settings']");
      setting.click();
      await waitForElement(
        "//navigation-drawer-item[.//div[text()='Access and security']]"
      );
      await clickButtonByXPath(
        "//navigation-drawer-item[.//div[text()='Access and security']]"
      );
      await waitForElement("//tab-button[.//div[text()='Managers']]");
      await clickButtonByXPath("//tab-button[.//div[text()='Managers']]");
      const accept = await waitForElement_timeout(
        "//mat-button[.//span[text()='Accept']]"
      ); // đợi accpet 115s
      if (accept) {
        clickButtonByXPath("//mat-button[.//span[text()='Accept']]");
        console.log("✅ Đã click Accept");
      } else {
        console.error("❌ Không tìm thấy nút Accept trong thời gian quy định");
      }
      await waitForElement("//material-button[.//div[text()='Grant access']]");
      await clickButtonByXPath(
        "//material-button[.//div[text()='Grant access']]"
      );
      console.log("✅ Đã click Grant access");
    }
  
    async function checkForServiceButton() {
      document.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          console.log("Đã nhấn Enter → chạy script...");
          click_quocgia(); // Gọi chạy tuần tự
        }
      });
    }
  
    // Gọi hàm kiểm tra liên tục
    checkForServiceButton();
    open_tk();
  })();
  
  
  
  async function conversios_mailedu() {
    (function () {
      "use strict";
  
      console.log("🚀 Script Conversios đã khởi động...");
  
      // === STATE HANDLER ===
      function setStep(step) {
        localStorage.setItem("plugin_install_step", step);
      }
  
      function getStep() {
        return localStorage.getItem("plugin_install_step") || "start";
      }
  
      // === UTILS ===
      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
  
      // Hàm đợi phần tử xuất hiện
      function waitForElement(xpath) {
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            const element = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            if (element) {
              clearInterval(interval);
              console.log(`✅ Phát hiện phần tử: ${xpath}`);
              resolve(element);
            }
          }, 500);
        });
      }
  
      async function clickButtonByXPath(xpath) {
        const button = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
  
        if (button) {
          button.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
          button.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
          button.click();
          console.log(`✅ Đã click: ${xpath}`);
        } else {
          console.error(`❌ Không tìm thấy phần tử: ${xpath}`);
        }
      }
  
      async function nhap_conver() {
        const input = document.querySelector("input#search-plugins");
        if (input) {
          input.value = "conversios";
          input.dispatchEvent(new Event("input", { bubbles: true }));
  
          const enterEvent = new KeyboardEvent("keydown", {
            key: "Enter",
            keyCode: 13,
            which: 13,
            bubbles: true,
          });
          input.dispatchEvent(enterEvent);
          console.log("🔍 Đã nhập từ khóa 'conversios' và nhấn Enter");
          setStep("wait_install_button"); // Lưu bước tiếp theo
          await delay(8000);
          location.reload();
        } else {
          setTimeout(nhap_conver, 500);
        }
      }
  
      // === MAIN LOGIC ===
      async function click_plugin() {
        const step = getStep();
        console.log("🔁 Đang ở bước:", step);
  
        if (step === "start") {
          nhap_tk11();
          await waitForElement(
            "(//a[contains(@href, 'plugins.php') and contains(., 'Plugins')])[1]"
          );
          await clickButtonByXPath(
            "(//a[contains(@href, 'plugins.php') and contains(., 'Plugins')])[1]"
          );
          setStep("go_to_add_plugin");
          return;
        }
  
        if (step === "go_to_add_plugin") {
          await waitForElement("//a[@href='plugin-install.php']");
          await clickButtonByXPath("//a[@href='plugin-install.php']");
          setStep("search_conversios");
          return;
        }
  
        if (step === "search_conversios") {
          await waitForElement(
            "//h1[@class='wp-heading-inline' and normalize-space()='Add Plugins']"
          );
          await nhap_conver(); // ❗ Gây reload
          return;
        }
  
        if (step === "wait_install_button") {
          await waitForElement(
            "//a[@href='https://profiles.wordpress.org/tatvic/' and text()='Conversios']"
          );
          await clickButtonByXPath(
            "(//a[contains(@aria-label, 'Install Conversios')])[1]"
          );
          setStep("wait_activate");
          await delay(13000);
          location.reload();
          return;
        }
  
        if (step === "wait_activate") {
          await waitForElement("//a[contains(text(), 'Activate')]");
          await clickButtonByXPath("//a[contains(text(), 'Activate')]");
          setStep("go_to_pixels");
          return;
        }
  
        if (step === "go_to_pixels") {
          await waitForElement(
            "(//a[@href='admin.php?page=conversios-google-analytics' and contains(text(), 'Pixels & Analytics')])[1]"
          );
          await clickButtonByXPath(
            "(//a[@href='admin.php?page=conversios-google-analytics' and contains(text(), 'Pixels & Analytics')])[1]"
          );
          setStep("click_arrow");
          return;
        }
  
        if (step === "click_arrow") {
          await waitForElement(
            "(//span[@class='material-symbols-outlined fs-2 border-2 border-solid rounded-pill' and text()='arrow_forward'])[2]"
          );
          await clickButtonByXPath(
            "(//span[@class='material-symbols-outlined fs-2 border-2 border-solid rounded-pill' and text()='arrow_forward'])[2]"
          );
          setStep("done");
          return;
        }
  
        if (step === "done") {
          await tao_tkkk();
          await click_tk();
          console.log("🎉 Hoàn tất cài đặt plugin Conversios!");
        }
      }
  
      let isRunning = false;
      async function runOnce() {
        if (isRunning) return;
        isRunning = true;
        await click_plugin();
        isRunning = false;
      }
  
      runOnce();
      nhap_tk11();
      click_tk();
    })();
  
    async function tao_tkkk() {
      console.log("🔥 Vào hàm tạo tài khoản...");
      // Hàm chờ một khoảng thời gian
      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
  
      // Hàm đợi phần tử xuất hiện
      function waitForElement(xpath) {
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            const element = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            if (element) {
              clearInterval(interval);
              console.log(`✅ Phát hiện phần tử: ${xpath}`);
              resolve(element);
            }
          }, 500);
        });
      }
  
      // Hàm đợi phần tử xuất hiện với timeout
      function waitForElement_timeout(xpath, timeout = 15000) {
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            const element = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            if (element) {
              clearInterval(interval);
              console.log(`✅ Phát hiện phần tử: ${xpath}`);
              resolve(element);
            }
          }, 500);
  
          // Thêm timeout để dừng hàm sau một khoảng thời gian nhất định
          setTimeout(() => {
            clearInterval(interval);
            console.log(`⏰ Thời gian chờ đã hết: ${xpath}`);
            reject(new Error(`Không tìm thấy phần tử sau ${timeout}ms`));
          }, timeout);
        });
      }
  
      // Hàm click theo XPath với sự kiện mousedown, mouseup và click
      async function clickButtonByXPath(xpath) {
        const button = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
  
        if (button) {
          // Gửi sự kiện mousedown
          const mouseDownEvent = new MouseEvent("mousedown", {
              bubbles: true,
              cancelable: true
          });
          button.dispatchEvent(mouseDownEvent);
          console.log(`✅ Đã gửi sự kiện mousedown: ${xpath}`);
  
          // Gửi sự kiện mouseup
          const mouseUpEvent = new MouseEvent("mouseup", {
              bubbles: true,
              cancelable: true
          });
          button.dispatchEvent(mouseUpEvent);
          console.log(`✅ Đã gửi sự kiện mouseup: ${xpath}`);
  
          // Thực hiện click
          button.click();
          console.log(`✅ Đã click: ${xpath}`);
      } else {
          console.error(`❌ Không tìm thấy phần tử với XPath: ${xpath}`);
      }
  }
      async function openInvitationLink() {
        const link = document.querySelector("#ads_invitationLink");
        if (link) {
          const href = link.href;
          const newTab = window.open(href, "_blank");
  
          if (newTab) {
            console.log("✅ Đã mở tab mới:", href);
            newTab.focus();
          } else {
            console.error("❌ Trình duyệt đã chặn popup. Hãy bật thủ công.");
          }
        } else {
          console.error("❌ Không tìm thấy Invitation Link");
        }
      }
  
      async function click_quocgia() {
        const creat = await waitForElement("//*[@id='conv_create_gads_new_btn']");
        creat.click();
  
        await waitForElement(
          '//div[@id="conv_create_gads_new" and contains(@class, "show") and @style="display: block;"]'
        ); // đợi click nút createElement
  
        await clickButtonByXPath('//span[@id="select2-gads_country-container"]');
  
        await waitForElement(
          '//span[contains(@class, "select2-container") and contains(@class, "select2-container--open")]'
        ); // đợi drop mở
  
        const country = await waitForElement(
          "//li[contains(@class, 'select2-results__option') and normalize-space(text())='Israel']"
        );
        await clickButtonByXPath(
          "//li[contains(@class, 'select2-results__option') and normalize-space(text())='Israel']"
        );
  
        await waitForElement(
          '//span[@id="select2-gads_currency-container" and not(contains(text(), "Select Currency"))]'
        ); // đợi tiền xuất hiện
  
        await clickButtonByXPath("//*[@id='ads-continue']"); //click nút semd
  
        await waitForElement(
          "//span[@id='after_gadsacccreated_title' and not(contains(@class, 'd-none'))]"
        );
  
        await openInvitationLink();
  
        location.reload();
      }
  
      // Đọc giá trị 'i' từ localStorage nếu có, nếu không có thì mặc định là 1
      let i = parseInt(localStorage.getItem("lastRun") || "0");
  
      async function runSequentially() {
        if (i > 6) {
          console.log("Đã hoàn thành tất cả các vòng lặp.");
          return; // Dừng lại nếu i đã vượt quá 20
        }
  
        // Tăng giá trị i ngay lập tức
        console.log(`🚀 Lần chạy thứ ${i}`);
        // Tăng giá trị i sau mỗi lần thực thi
  
        // Lưu lại giá trị i vào localStorage sau khi tăng
        localStorage.setItem("lastRun", i.toString());
  
        // Thực hiện các hàm
        await click_quocgia();
        console.log("⏳ Chờ 10s trước lần chạy tiếp theo...");
        // await xoa_tk01();
        await delay(4000);
        console.log("...đang delay 4s kimochi ứ ứ ứ");
        i++;
        runSequentially();
      }
  
      async function checkForServiceButton() {
        const serviceButton = await waitForElement(
          "//button[@id='conv_create_gads_new_btn' and not(contains(@class, 'disabled'))]"
        );
        if (serviceButton) {
          console.log(" chạy script...");
          runSequentially();
        }
      }
  
      // Gọi hàm kiểm tra liên tục
      checkForServiceButton();
    }
  
    async function click_tk() {
      console.log("🔥 Vào hàm click tài khoản...");
      // Hàm chờ một khoảng thời gian
      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
  
      // Hàm đợi phần tử xuất hiện
      function waitForElement(xpath) {
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            const element = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            if (element) {
              clearInterval(interval);
              console.log(`✅ Phát hiện phần tử: ${xpath}`);
              resolve(element);
            }
          }, 500);
        });
      }
  
      // Hàm đợi phần tử xuất hiện với timeout
      function waitForElement_timeout(xpath, timeout = 15000) {
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            const element = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            if (element) {
              clearInterval(interval);
              console.log(`✅ Phát hiện phần tử: ${xpath}`);
              resolve(element);
            }
          }, 500);
  
          // Thêm timeout để dừng hàm sau một khoảng thời gian nhất định
          setTimeout(() => {
            clearInterval(interval);
            console.log(`⏰ Thời gian chờ đã hết: ${xpath}`);
            reject(new Error(`Không tìm thấy phần tử sau ${timeout}ms`));
          }, timeout);
        });
      }
  
      // Hàm click theo XPath với sự kiện mousedown, mouseup và click
      async function clickButtonByXPath(xpath) {
        const button = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
  
        if (button) {
          // Gửi sự kiện mousedown
          const mouseDownEvent = new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          button.dispatchEvent(mouseDownEvent);
          console.log(`✅ Đã gửi sự kiện mousedown: ${xpath}`);
  
          // Gửi sự kiện mouseup
          const mouseUpEvent = new MouseEvent("mouseup", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          button.dispatchEvent(mouseUpEvent);
          console.log(`✅ Đã gửi sự kiện mouseup: ${xpath}`);
  
          // Thực hiện click
          button.click();
          console.log(`✅ Đã click: ${xpath}`);
        } else {
          console.error(`❌ Không tìm thấy phần tử với XPath: ${xpath}`);
        }
      }
  
      async function click_quocgia() {
        const creat = await waitForElement(
          "//material-button[.//div[text()='Continue']]"
        );
        creat.click();
      }
  
      async function runSequentially2() {
        // Thực hiện các hàm
        await click_quocgia();
  
        runSequentially2();
      }
  
      async function checkForServiceButton2() {
        const serviceButton = await waitForElement(
          "//div[contains(@class, 'title') and text()='Hello and welcome to Google Ads!']"
        );
        if (serviceButton) {
          console.log(" chạy script...");
          runSequentially2(); // Gọi chạy tuần tự 3 lần
        }
      }
  
      // Gọi hàm kiểm tra liên tục
      checkForServiceButton2();
    }
  
    async function nhap_tk11() {
      console.log("🚀 Script Tampermonkey đã khởi động...");
  
      // Hàm chờ một khoảng thời gian
      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
  
      // Hàm đợi phần tử xuất hiện
      function waitForElement(xpath) {
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            const element = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            if (element) {
              clearInterval(interval);
              console.log(`✅ Phát hiện phần tử: ${xpath}`);
              resolve(element);
            }
          }, 500);
        });
      }
  
      // Hàm đợi phần tử xuất hiện với timeout
      function waitForElement_timeout(xpath, timeout = 15000) {
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            const element = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            if (element) {
              clearInterval(interval);
              console.log(`✅ Phát hiện phần tử: ${xpath}`);
              resolve(element);
            }
          }, 500);
  
          // Thêm timeout để dừng hàm sau một khoảng thời gian nhất định
          setTimeout(() => {
            clearInterval(interval);
            console.log(`⏰ Thời gian chờ đã hết: ${xpath}`);
            reject(new Error(`Không tìm thấy phần tử sau ${timeout}ms`));
          }, timeout);
        });
      }
  
      // Hàm click theo XPath với sự kiện mousedown, mouseup và click
      async function clickButtonByXPath(xpath) {
        const button = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
  
        if (button) {
          // Gửi sự kiện mousedown
          const mouseDownEvent = new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          button.dispatchEvent(mouseDownEvent);
          console.log(`✅ Đã gửi sự kiện mousedown: ${xpath}`);
  
          // Gửi sự kiện mouseup
          const mouseUpEvent = new MouseEvent("mouseup", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          button.dispatchEvent(mouseUpEvent);
          console.log(`✅ Đã gửi sự kiện mouseup: ${xpath}`);
  
          // Thực hiện click
          button.click();
          console.log(`✅ Đã click: ${xpath}`);
        } else {
          console.error(`❌ Không tìm thấy phần tử với XPath: ${xpath}`);
        }
      }
  
      async function click_quocgia() {
        const userInput = document.getElementById("admin_username");
        if (userInput) {
          userInput.focus();
          userInput.value = "admin";
  
          // Gửi sự kiện input + change
          userInput.dispatchEvent(new Event("input", { bubbles: true }));
          userInput.dispatchEvent(new Event("change", { bubbles: true }));
  
          console.log("✅ Nhập username");
        }
  
        const passInput = document.getElementById("admin_pass");
        if (passInput) {
          passInput.focus();
          passInput.value = "thangkiem200m";
  
          // Gửi sự kiện input + change + keyup để gọi check_pass_strength()
          passInput.dispatchEvent(new Event("input", { bubbles: true }));
          passInput.dispatchEvent(new Event("change", { bubbles: true }));
          passInput.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true }));
  
          console.log("✅ Nhập mật khẩu");
        } else {
          console.log("❌ Không tìm thấy ô mật khẩu");
        }
  
        // Tự động bấm nút Install
        const installBtn = document.getElementById("softsubmitbut");
        if (installBtn) {
          installBtn.focus();
          installBtn.click();
          console.log("🚀 Đã bấm nút Install");
        } else {
          console.log("❌ Không tìm thấy nút Install");
        }
      }
  
      async function runSequentially() {
        console.log("đã chạy hàm");
        // Thực hiện các hàm
        await click_quocgia();
      }
  
      function checkForServiceButton() {
        console.log("⏳ Chờ nhấn phím [Space] để chạy script...");
  
        window.addEventListener("keyup", function handler(e) {
          if (e.code === "Space" || e.key === " ") {
            e.preventDefault();
            console.log("🚀 Đã nhấn phím Space → chạy script!");
            runSequentially();
            window.removeEventListener("keyup", handler);
          }
        });
      }
  
      // Gọi hàm kiểm tra liên tục
      checkForServiceButton();
    }
  }
  
  async function conversios_mailthuong() {
    (function () {
      "use strict";
  
      console.log("🚀hàm mail thường đã chạy...");
  
      // === STATE HANDLER ===
      function setStep(step) {
        localStorage.setItem("plugin_install_step", step);
      }
  
      function getStep() {
        return localStorage.getItem("plugin_install_step") || "start";
      }
  
      // === UTILS ===
      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
  
      // Hàm đợi phần tử xuất hiện
      function waitForElement(xpath) {
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            const element = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            if (element) {
              clearInterval(interval);
              console.log(`✅ Phát hiện phần tử: ${xpath}`);
              resolve(element);
            }
          }, 500);
        });
      }
      async function clickButtonByXPath(xpath) {
        const button = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
      
        if (button) {
          console.log("✅ Đã tìm thấy button, chuẩn bị click:", button);
          button.click(); // ← thay vì dùng dispatchEvent
        } else {
          console.error(`❌ Không tìm thấy phần tử: ${xpath}`);
        }
      }
  
      async function nhap_conver() {
        const input = document.querySelector("input#search-plugins");
        if (input) {
          input.value = "conversios";
          input.dispatchEvent(new Event("input", { bubbles: true }));
  
          const enterEvent = new KeyboardEvent("keydown", {
            key: "Enter",
            keyCode: 13,
            which: 13,
            bubbles: true,
          });
          input.dispatchEvent(enterEvent);
          console.log("🔍 Đã nhập từ khóa 'conversios' và nhấn Enter");
          setStep("wait_install_button"); // Lưu bước tiếp theo
          await delay(8000);
          location.reload();
        } else {
          setTimeout(nhap_conver, 500);
        }
      }
  
      // === MAIN LOGIC ===
      async function click_plugin() {
        const step = getStep();
        console.log("🔁 Đang ở bước:", step);
  
        if (step === "start") {
          nhap_tk11();
          await waitForElement(
            "(//a[contains(@href, 'plugins.php') and contains(., 'Plugins')])[1]"
          );
          await clickButtonByXPath(
            "(//a[contains(@href, 'plugins.php') and contains(., 'Plugins')])[1]"
          );
          setStep("go_to_add_plugin");
          return;
        }
  
        if (step === "go_to_add_plugin") {
          await waitForElement("//a[@href='plugin-install.php']");
          await clickButtonByXPath("//a[@href='plugin-install.php']");
          setStep("search_conversios");
          return;
        }
  
        if (step === "search_conversios") {
          await waitForElement(
            "//h1[@class='wp-heading-inline' and normalize-space()='Add Plugins']"
          );
          await nhap_conver(); // ❗ Gây reload
          return;
        }
  
        if (step === "wait_install_button") {
          await waitForElement(
            "//a[@href='https://profiles.wordpress.org/tatvic/' and text()='Conversios']"
          );
          await clickButtonByXPath(
            "(//a[contains(@aria-label, 'Install Conversios')])[1]"
          );
          setStep("wait_activate");
          await delay(13000);
          location.reload();
          return;
        }
  
        if (step === "wait_activate") {
          await waitForElement("//a[contains(text(), 'Activate')]");
          await clickButtonByXPath("//a[contains(text(), 'Activate')]");
          setStep("go_to_pixels");
          return;
        }
  
        if (step === "go_to_pixels") {
          await waitForElement(
            "(//a[@href='admin.php?page=conversios-google-analytics' and contains(text(), 'Pixels & Analytics')])[1]"
          );
          await clickButtonByXPath(
            "(//a[@href='admin.php?page=conversios-google-analytics' and contains(text(), 'Pixels & Analytics')])[1]"
          );
          setStep("click_arrow");
          return;
        }
  
        if (step === "click_arrow") {
          await waitForElement(
            "(//span[@class='material-symbols-outlined fs-2 border-2 border-solid rounded-pill' and text()='arrow_forward'])[2]"
          );
          await clickButtonByXPath(
            "(//span[@class='material-symbols-outlined fs-2 border-2 border-solid rounded-pill' and text()='arrow_forward'])[2]"
          );
          setStep("done");
          return;
        }
  
        if (step === "done") {
          await tao_tkkk();
          await click_tk();
          console.log("🎉 Hoàn tất cài đặt plugin Conversios!");
        }
      }
  
      let isRunning = false;
      async function runOnce() {
        if (isRunning) return;
        isRunning = true;
        await click_plugin();
        isRunning = false;
      }
  
      runOnce();
      nhap_tk11();
      click_tk();
    })();
  
    async function tao_tkkk() {
      console.log("🔥 Vào hàm tạo tài khoản...");
      // Hàm chờ một khoảng thời gian
      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
  
      // Hàm đợi phần tử xuất hiện
      function waitForElement(xpath) {
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            const element = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            if (element) {
              clearInterval(interval);
              console.log(`✅ Phát hiện phần tử: ${xpath}`);
              resolve(element);
            }
          }, 500);
        });
      }
  
      // Hàm đợi phần tử xuất hiện với timeout
      function waitForElement_timeout(xpath, timeout = 15000) {
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            const element = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            if (element) {
              clearInterval(interval);
              console.log(`✅ Phát hiện phần tử: ${xpath}`);
              resolve(element);
            }
          }, 500);
  
          // Thêm timeout để dừng hàm sau một khoảng thời gian nhất định
          setTimeout(() => {
            clearInterval(interval);
            console.log(`⏰ Thời gian chờ đã hết: ${xpath}`);
            reject(new Error(`Không tìm thấy phần tử sau ${timeout}ms`));
          }, timeout);
        });
      }
      async function clickButtonByXPath(xpath) {
        const button = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
      
        if (button) {
          try {
            const eventOptions = {
              bubbles: true,
              cancelable: true
              // ❌ Không có view: window
            };
      
            button.dispatchEvent(new MouseEvent("mousedown", eventOptions));
            button.dispatchEvent(new MouseEvent("mouseup", eventOptions));
            button.dispatchEvent(new MouseEvent("click", eventOptions));
          } catch (e) {
            console.warn("⚠ MouseEvent failed, fallback click()", e);
            button.click();
          }
      
          console.log(`✅ Đã click: ${xpath}`);
        } else {
          console.error(`❌ Không tìm thấy phần tử: ${xpath}`);
        }
      }
  
      // async function openInvitationLink() {
      //     const link = document.querySelector('#ads_invitationLink');
      //     if (link) {
      //         const href = link.href;
      //         const newTab = window.open(href, '_blank');
  
      //         if (newTab) {
      //             console.log("✅ Đã mở tab mới:", href);
      //             newTab.focus();
      //         } else {
      //             console.error("❌ Trình duyệt đã chặn popup. Hãy bật thủ công.");
      //         }
      //     } else {
      //         console.error("❌ Không tìm thấy Invitation Link");
      //     }
      // }
  
      async function click_quocgia() {
        const creat = await waitForElement("//*[@id='conv_create_gads_new_btn']");
        creat.click();
  
        await waitForElement(
          '//div[@id="conv_create_gads_new" and contains(@class, "show") and @style="display: block;"]'
        ); // đợi click nút createElement
  
        await clickButtonByXPath('//span[@id="select2-gads_country-container"]');
  
        await waitForElement(
          '//span[contains(@class, "select2-container") and contains(@class, "select2-container--open")]'
        ); // đợi drop mở
  
        const country = await waitForElement(
          "//li[contains(@class, 'select2-results__option') and normalize-space(text())='Israel']"
        );
        await clickButtonByXPath(
          "//li[contains(@class, 'select2-results__option') and normalize-space(text())='Israel']"
        );
  
        await waitForElement(
          '//span[@id="select2-gads_currency-container" and not(contains(text(), "Select Currency"))]'
        ); // đợi tiền xuất hiện
  
        await clickButtonByXPath("//*[@id='ads-continue']"); //click nút semd
  
        // await waitForElement("//span[@id='after_gadsacccreated_title' and not(contains(@class, 'd-none'))]");
  
        // await openInvitationLink();
        await delay(2000);
        i++;
        location.reload();
      }
  
      // Đọc giá trị 'i' từ localStorage nếu có, nếu không có thì mặc định là 1
      let i = parseInt(localStorage.getItem("lastRun") || "0");
  
      async function runSequentially() {
        if (i > 6) {
          console.log("Đã hoàn thành tất cả các vòng lặp.");
          localStorage.clear();
          location.reload();
          return; // Dừng lại nếu i đã vượt quá 20
        }
  
        // Thực hiện các hàm
        await click_quocgia();
        // Tăng giá trị i ngay lập tức
        console.log(`🚀 Lần chạy thứ ${i}`);
        // Tăng giá trị i sau mỗi lần thực thi
  
        // Lưu lại giá trị i vào localStorage sau khi tăng
        localStorage.setItem("lastRun", i.toString());
        console.log("⏳ Chờ 10s trước lần chạy tiếp theo...");
        // await xoa_tk01();
        await delay(4000);
        console.log("...đang delay 4s kimochi ứ ứ ứ");
  
        runSequentially();
      }
  
      async function checkForServiceButton() {
        const serviceButton = await waitForElement(
          "//button[@id='conv_create_gads_new_btn' and not(contains(@class, 'disabled'))]"
        );
        if (serviceButton) {
          console.log(" chạy script...");
          runSequentially();
        }
      }
  
      // Gọi hàm kiểm tra liên tục
      checkForServiceButton();
    }
  
    async function click_tk() {
      console.log("🔥 Vào hàm click tài khoản...");
      // Hàm chờ một khoảng thời gian
      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
  
      // Hàm đợi phần tử xuất hiện
      function waitForElement(xpath) {
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            const element = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            if (element) {
              clearInterval(interval);
              console.log(`✅ Phát hiện phần tử: ${xpath}`);
              resolve(element);
            }
          }, 500);
        });
      }
  
      // Hàm đợi phần tử xuất hiện với timeout
      function waitForElement_timeout(xpath, timeout = 15000) {
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            const element = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            if (element) {
              clearInterval(interval);
              console.log(`✅ Phát hiện phần tử: ${xpath}`);
              resolve(element);
            }
          }, 500);
  
          // Thêm timeout để dừng hàm sau một khoảng thời gian nhất định
          setTimeout(() => {
            clearInterval(interval);
            console.log(`⏰ Thời gian chờ đã hết: ${xpath}`);
            reject(new Error(`Không tìm thấy phần tử sau ${timeout}ms`));
          }, timeout);
        });
      }
  
      // Hàm click theo XPath với sự kiện mousedown, mouseup và click
      async function clickButtonByXPath(xpath) {
        const button = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
  
        if (button) {
          // Gửi sự kiện mousedown
          const mouseDownEvent = new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          button.dispatchEvent(mouseDownEvent);
          console.log(`✅ Đã gửi sự kiện mousedown: ${xpath}`);
  
          // Gửi sự kiện mouseup
          const mouseUpEvent = new MouseEvent("mouseup", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          button.dispatchEvent(mouseUpEvent);
          console.log(`✅ Đã gửi sự kiện mouseup: ${xpath}`);
  
          // Thực hiện click
          button.click();
          console.log(`✅ Đã click: ${xpath}`);
        } else {
          console.error(`❌ Không tìm thấy phần tử với XPath: ${xpath}`);
        }
      }
  
      async function click_quocgia() {
        const creat = await waitForElement(
          "//material-button[.//div[text()='Continue']]"
        );
        creat.click();
      }
  
      async function runSequentially2() {
        // Thực hiện các hàm
        await click_quocgia();
  
        runSequentially2();
      }
  
      async function checkForServiceButton2() {
        const serviceButton = await waitForElement(
          "//div[contains(@class, 'title') and text()='Hello and welcome to Google Ads!']"
        );
        if (serviceButton) {
          console.log(" chạy script...");
          runSequentially2(); // Gọi chạy tuần tự 3 lần
        }
      }
  
      // Gọi hàm kiểm tra liên tục
      checkForServiceButton2();
    }
  
    async function nhap_tk11() {
      console.log("chạy nhập tk.");
  
      // Hàm chờ một khoảng thời gian
      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
  
      // Hàm đợi phần tử xuất hiện
      function waitForElement(xpath) {
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            const element = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            if (element) {
              clearInterval(interval);
              console.log(`✅ Phát hiện phần tử: ${xpath}`);
              resolve(element);
            }
          }, 500);
        });
      }
  
      // Hàm đợi phần tử xuất hiện với timeout
      function waitForElement_timeout(xpath, timeout = 15000) {
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            const element = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            ).singleNodeValue;
            if (element) {
              clearInterval(interval);
              console.log(`✅ Phát hiện phần tử: ${xpath}`);
              resolve(element);
            }
          }, 500);
  
          // Thêm timeout để dừng hàm sau một khoảng thời gian nhất định
          setTimeout(() => {
            clearInterval(interval);
            console.log(`⏰ Thời gian chờ đã hết: ${xpath}`);
            reject(new Error(`Không tìm thấy phần tử sau ${timeout}ms`));
          }, timeout);
        });
      }
  
      // Hàm click theo XPath với sự kiện mousedown, mouseup và click
      async function clickButtonByXPath(xpath) {
        const button = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
  
        if (button) {
          // Gửi sự kiện mousedown
          const mouseDownEvent = new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          button.dispatchEvent(mouseDownEvent);
          console.log(`✅ Đã gửi sự kiện mousedown: ${xpath}`);
  
          // Gửi sự kiện mouseup
          const mouseUpEvent = new MouseEvent("mouseup", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          button.dispatchEvent(mouseUpEvent);
          console.log(`✅ Đã gửi sự kiện mouseup: ${xpath}`);
  
          // Thực hiện click
          button.click();
          console.log(`✅ Đã click: ${xpath}`);
        } else {
          console.error(`❌ Không tìm thấy phần tử với XPath: ${xpath}`);
        }
      }
  
      async function click_quocgia() {
        const userInput = document.getElementById("admin_username");
        if (userInput) {
          userInput.focus();
          userInput.value = "admin";
  
          // Gửi sự kiện input + change
          userInput.dispatchEvent(new Event("input", { bubbles: true }));
          userInput.dispatchEvent(new Event("change", { bubbles: true }));
  
          console.log("✅ Nhập username");
        }
  
        const passInput = document.getElementById("admin_pass");
        if (passInput) {
          passInput.focus();
          passInput.value = "thangkiem200m";
  
          // Gửi sự kiện input + change + keyup để gọi check_pass_strength()
          passInput.dispatchEvent(new Event("input", { bubbles: true }));
          passInput.dispatchEvent(new Event("change", { bubbles: true }));
          passInput.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true }));
  
          console.log("✅ Nhập mật khẩu");
        } else {
          console.log("❌ Không tìm thấy ô mật khẩu");
        }
  
        // Tự động bấm nút Install
        const installBtn = document.getElementById("softsubmitbut");
        if (installBtn) {
          installBtn.focus();
          installBtn.click();
          console.log("🚀 Đã bấm nút Install");
        } else {
          console.log("❌ Không tìm thấy nút Install");
        }
      }
  
      async function runSequentially() {
        console.log("đã chạy hàm");
        // Thực hiện các hàm
        await click_quocgia();
      }
  
      function checkForServiceButton() {
        console.log("⏳ Chờ nhấn phím [Space] để chạy script...");
  
        window.addEventListener("keyup", function handler(e) {
          if (e.code === "Space" || e.key === " ") {
            e.preventDefault();
            console.log("🚀 Đã nhấn phím Space → chạy script!");
            runSequentially();
            window.removeEventListener("keyup", handler);
          }
        });
      }
  
      // Gọi hàm kiểm tra liên tục
      checkForServiceButton();
    }
  }
  
  async function copy_id_tkdon() {
    (function () {
      let ids = [];
      const idElements = document.querySelectorAll(".pretty-customer-id");
  
      // Lấy văn bản của từng phần tử và đẩy vào mảng
      idElements.forEach((element) => {
        ids.push(element.textContent.trim());
      });
  
      // Loại bỏ các giá trị trùng lặp
      const uniqueIds = [...new Set(ids)];
  
      // Chuỗi danh sách ID với định dạng mong muốn
      const idsString = uniqueIds.join("\n");
  
      console.log("📋 Danh sách ID:\n" + idsString);
  
      // Tạo textarea ẩn để sao chép vào clipboard
      const textarea = document.createElement("textarea");
      textarea.value = idsString;
      textarea.style.position = "fixed"; // tránh bị cuộn
      textarea.style.opacity = 0;
      document.body.appendChild(textarea);
      textarea.select();
  
      try {
        document.execCommand("copy");
        console.log("✅ Danh sách ID đã được sao chép vào clipboard!");
        alert(`✅ Đã sao chép ${uniqueIds.length} Customer ID!`);
      } catch (err) {
        console.error("❌ Không thể sao chép vào clipboard:", err);
      }
  
      // Xóa textarea sau khi sao chép
      document.body.removeChild(textarea);
    })();
  }
  
  async function copy_id_mcc() {
    const ids = Array.from(
      document.querySelectorAll("accounts-cell a.ess-cell-link.account-cell-link")
    ).map((a) => a.textContent.trim());
  
    console.log(ids.join("\n"));
  }
  
  
  async function xmdtggadsa() {
    (function () {
      "use strict";
      function clickFirstElement() {
        return new Promise(function (resolve, reject) {
          const interval = setInterval(function () {
            const element = document.querySelector(
              "#navigation\\.billing > div > a > rail-item"
            );
            if (element) {
              element.click();
              console.log("Đã click vào phần tử đầu tiên.");
              clearInterval(interval); // Dừng kiểm tra sau khi click
              resolve(); // Gọi resolve khi hoàn tất
            } else {
              console.log("Chưa tìm thấy phần tử đầu tiên, tiếp tục kiểm tra...");
            }
          }, 1000); // Kiểm tra mỗi giây (1000ms)
        });
      }
    
      // Hàm click vào phần tử thứ hai
      function clickSecondElement() {
        return new Promise(function (resolve, reject) {
          const element = document.querySelector(
            "#navigation\\.billing\\.advertiserVerificationIdentity > div > a"
          );
          if (element) {
            element.click();
            console.log("Đã click vào phần tử thứ hai.");
            resolve(); // Gọi resolve khi hoàn tất
          } else {
            console.log("Không tìm thấy phần tử thứ hai.");
            reject("Không tìm thấy phần tử thứ hai");
          }
        });
      }
    
      // Hàm kiểm tra và click vào phần tử thứ ba (nút material-button)
      function waitForThirdElementAndClick() {
        return new Promise(function (resolve, reject) {
          const interval = setInterval(function () {
            const element = document.querySelector(
              "material-button.task-item-button.filled-button"
            );
            if (element) {
              element.click();
              console.log("Đã click vào nút material-button.");
              clearInterval(interval); // Dừng kiểm tra khi nút đã xuất hiện và được click
              resolve(); // Gọi resolve khi hoàn tất
            } else {
              console.log(
                "Chưa tìm thấy nút material-button, tiếp tục kiểm tra..."
              );
            }
          }, 1000); // Kiểm tra mỗi giây (1000ms)
        });
      }
    
      // Hàm kiểm tra và click vào phần tử có aria-label="No"
      function clickNoElement() {
        return new Promise(function (resolve, reject) {
          const interval = setInterval(function () {
            const element = document.querySelector('[aria-label="No"]');
            if (element) {
              element.click();
              console.log('Đã click vào phần tử có aria-label="No".');
              clearInterval(interval); // Dừng kiểm tra sau khi click
              resolve(); // Gọi resolve khi hoàn tất
            } else {
              console.log(
                'Chưa tìm thấy phần tử có aria-label="No", tiếp tục kiểm tra...'
              );
            }
          }, 1000); // Kiểm tra mỗi giây (1000ms)
        });
      }
    
      // Hàm kiểm tra và click vào phần tử có aria-label="Yes, we pay Google Ads directly"
      function clickYesElement() {
        return new Promise(function (resolve, reject) {
          const interval = setInterval(function () {
            const element = document.querySelector(
              '[aria-label="Yes, we pay Google Ads directly"]'
            );
            if (element) {
              element.click();
              console.log(
                'Đã click vào phần tử có aria-label="Yes, we pay Google Ads directly".'
              );
              clearInterval(interval); // Dừng kiểm tra sau khi click
              resolve(); // Gọi resolve khi hoàn tất
            } else {
              console.log(
                'Chưa tìm thấy phần tử có aria-label="Yes, we pay Google Ads directly", tiếp tục kiểm tra...'
              );
            }
          }, 1000); // Kiểm tra mỗi giây (1000ms)
        });
      }
    
      // Hàm kiểm tra và click vào phần tử save
      function clickSaveElement() {
        return new Promise(function (resolve, reject) {
          const interval = setInterval(function () {
            const element = document.querySelector("material-button.save-button");
            if (element) {
              element.click();
              console.log("Đã click vào nút save.");
              clearInterval(interval); // Dừng kiểm tra khi nút đã xuất hiện và được click
              resolve(); // Gọi resolve khi hoàn tất
            } else {
              console.log("Chưa tìm thấy nút save, tiếp tục kiểm tra...");
            }
          }, 1000); // Kiểm tra mỗi giây (1000ms)
        });
      }
    
      // Hàm kiểm tra và click vào phần tử save
      function clickTaskElement() {
        return new Promise(function (resolve, reject) {
          const interval = setInterval(function () {
            const element = document.querySelector(
              ".task-item-button.filled-button"
            );
            if (element) {
              element.click();
              console.log("Đã click vào nút save.");
              clearInterval(interval); // Dừng kiểm tra khi nút đã xuất hiện và được click
              resolve(); // Gọi resolve khi hoàn tất
            } else {
              console.log("Chưa tìm thấy nút save, tiếp tục kiểm tra...");
            }
          }, 1000); // Kiểm tra mỗi giây (1000ms)
        });
      }
    
    
      async function nhap_tk() {
        console.log("Đã chạy hàm nhap_tk");
      
        function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }
      
        function waitForInput() {
          return new Promise((resolve) => {
            const interval = setInterval(() => {
              const firstInput = document.querySelector(
                'input[type="search"], input[aria-label="Organization name"]'
              );
              if (firstInput) {
                clearInterval(interval);
                resolve();
              }
            }, 1000);
          });
        }
      
        async function fillInput(input, value) {
          if (input) {
            input.value = value;
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
            input.blur();
            console.log(`Đã nhập ${value}`);
          }
        }
      
        await waitForInput();
      
        const company = await GM_getValue("custom_company", "NHẬP TÊN CÔNG TY");
        const address = await GM_getValue("custom_address", "NHẬP ĐỊA CHỈ");
        const city = await GM_getValue("custom_city", "NHẬP THÀNH PHỐ");
        const zip = await GM_getValue("custom_zip", "NHẬP POSTCODE");
        const state = await GM_getValue("custom_states", "NHẬP STATES");
        const phone = await GM_getValue("custom_phone", "NHẬP MÃ DUNS(NẾU CÓ)");
      
        const allInputs = document.querySelectorAll('input[type="search"]');
        
        // Nhập thông tin lần lượt
        await fillInput(allInputs[0], company);
        await fillInput(allInputs[1], address);
        await fillInput(allInputs[2], city);
        await fillInput(allInputs[3], zip);
      
        const telInput = document.querySelector('input[type="tel"]');
        await fillInput(telInput, phone);
      
        // Bước 1: Mở dropdown
        const dropdownButton = document.querySelector(".VfPpkd-TkwUic");
        if (dropdownButton) {
          dropdownButton.click();
          console.log("Đã mở dropdown.");
        }
      
        // Chờ cho dropdown mở
        await sleep(2000);
      
        // Chọn state từ listbox
        const listboxes = document.querySelectorAll('[role="listbox"][aria-label="State"]');
        if (listboxes.length > 0) {
          const listbox = listboxes[listboxes.length - 1];
          const options = listbox.querySelectorAll('li[role="option"]');
          let found = false;
          options.forEach((option) => {
            if (option.textContent.trim() === state) {
              option.click();
              console.log(`Đã chọn "${state}".`);
              found = true;
            }
          });
          if (!found) {
            console.log(`Không tìm thấy "${state}" trong listbox.`);
          }
        } else {
          console.log('Không tìm thấy bất kỳ listbox nào.');
        }
        
        await clickButton();
  
        async function clickButton() {
          return new Promise(function (resolve, reject) {
            let isButtonNotFound2 = false;
        
            const interval = setInterval(function () {
              const click_start = document.querySelector("span > div > button");
        
              if (click_start) {
                click_start.click();
                console.log("✅ Đã click vào button trong span > div > button.");
                clearInterval(interval);
                resolve();
              } else {
                if (!isButtonNotFound2) {
                  console.log("⏳ Chưa tìm thấy button trong span > div > button, tiếp tục kiểm tra...");
                  isButtonNotFound2 = true;
                }
              }
            }, 1000);
          });
        }
        
       
  
      }
  
      function staret() {
        return new Promise(function (resolve, reject) {
          let isButtonNotFound = false; // CHUYỂN ra ngoài interval
      
          const interval = setInterval(function () {
            const xpath = "//button[.//span[text()='Start verification']]";
            const result = document.evaluate(
              xpath,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            );
            const button = result.singleNodeValue;
      
            if (button) {
              button.click();
              console.log("✅ Đã click vào nút Start verification.");
              clearInterval(interval);
              resolve();
            } else {
              if (!isButtonNotFound) {
                console.log("⏳ Chưa tìm thấy nút Start verification, tiếp tục kiểm tra...");
                isButtonNotFound = true;
              }
            }
          }, 1000);
        });
      }
  
      function check_var() {
        return new Promise(function (resolve, reject) {
          let isButtonNotFound = false; // CHUYỂN ra ngoài interval
      
          const interval = setInterval(function () {
            const xpath1 = "//button[.//span[text()='Confirm']]";
            const result1 = document.evaluate(
              xpath1,
              document,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            );
            const button1 = result1.singleNodeValue;
      
            if (button1) {
              button1.click();
              console.log("✅ Đã click vào nútconfirm.");
              clearInterval(interval);
              resolve();
            } else {
              if (!isButtonNotFound) {
                console.log("⏳ Chưa tìm thấy nút confirm..");
                isButtonNotFound = true;
              }
            }
          }, 1000);
        });
      }
     
      
    
      async function runActions() {
      
         
          await clickFirstElement();
          await clickSecondElement();
          await waitForThirdElementAndClick();
          await clickNoElement();
          await clickYesElement();
          await clickSaveElement();
          await clickTaskElement();
      
  
      }
    
    
      document.addEventListener("keydown", async function (event) {
        if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
          console.log("Keydown event: Shift pressed");
          event.preventDefault();
      
          runActions();
  
        }
      });
     
  
  
    
      async function waitForElementToAppear(selector) {
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
              clearInterval(interval); // Dừng kiểm tra khi phần tử xuất hiện
              resolve();
            }
          }, 1000); // Kiểm tra mỗi giây (1000ms)
        });
      }
    
      ////  frame 2////
    
    
    
      staret();
      check_var();
   
      async function tkk() {
        await nhap_tk();
      }
             // chạy đầu tiên
      tkk(); // chạy sau khi staret xong
    
    
  
      //click chứ button
    // Khởi động các hàm
   
      // Your code here...
    })();
  }
