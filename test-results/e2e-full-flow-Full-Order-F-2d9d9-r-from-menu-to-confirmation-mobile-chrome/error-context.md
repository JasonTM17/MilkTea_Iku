# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e\full-flow.spec.ts >> Full Order Flow >> complete order from menu to confirmation
- Location: tests\e2e\full-flow.spec.ts:4:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('a[href*="/menu/"]').first()
    - locator resolved to <a href="/menu/matcha-latte" class="flex items-center gap-1 text-xs font-medium text-gray-400 transition-colors hover:text-brand-600">…</a>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div>…</div> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div>…</div> intercepts pointer events
    - retrying click action
      - waiting 100ms
    9 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div>…</div> intercepts pointer events
    - retrying click action
      - waiting 500ms

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Bỏ qua đến nội dung chính" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - generic [ref=e4]:
    - paragraph [ref=e5]: Miễn phí giao hàng cho đơn từ 100K
    - button [ref=e6]:
      - img [ref=e7]
  - generic [ref=e10]:
    - banner [ref=e11]:
      - generic [ref=e13]:
        - link "IkuMilk Tea" [ref=e14] [cursor=pointer]:
          - /url: /
          - img [ref=e16]
          - generic [ref=e25]: IkuMilk Tea
        - navigation [ref=e26]:
          - link "Trang chủ" [ref=e28] [cursor=pointer]:
            - /url: /
            - text: Trang chủ
          - link "Menu" [ref=e30] [cursor=pointer]:
            - /url: /menu
            - text: Menu
          - link "Về chúng tôi" [ref=e32] [cursor=pointer]:
            - /url: /about
            - text: Về chúng tôi
          - link "Đặt hàng" [ref=e34] [cursor=pointer]:
            - /url: /order
            - text: Đặt hàng
        - generic [ref=e35]:
          - button "Giỏ hàng" [ref=e36]:
            - img [ref=e37]
            - text: Giỏ hàng
          - button "Mở menu" [ref=e40]:
            - img [ref=e41]
    - main [ref=e42]:
      - generic [ref=e43]:
        - generic [ref=e44]:
          - heading "Menu" [level=1] [ref=e45]
          - paragraph [ref=e46]: Chọn hương vị yêu thích của bạn
        - generic [ref=e47]:
          - generic [ref=e48]:
            - generic [ref=e49]:
              - img [ref=e50]
              - textbox "Tìm kiếm món yêu thích..." [ref=e53]
            - generic [ref=e54]:
              - img [ref=e55]
              - combobox [ref=e58]:
                - option "Mới nhất" [selected]
                - option "Giá tăng dần"
                - option "Giá giảm dần"
              - img [ref=e60]
          - generic [ref=e62]:
            - button "Tất cả" [ref=e63]: Tất cả
            - button "Trà Sữa Truyền Thống" [ref=e64]
            - button "Trà Trái Cây" [ref=e65]
            - button "Đặc Biệt" [ref=e66]
            - button "Sữa Tươi & Kem" [ref=e67]
            - button "Trà Xanh & Matcha" [ref=e68]
          - paragraph [ref=e69]: Hiển thị 24 sản phẩm
          - generic [ref=e70]:
            - generic [ref=e74]:
              - generic [ref=e75]:
                - img "Matcha Latte Premium" [ref=e76]
                - generic [ref=e77]: Trà Xanh & MatchaBest Seller
                - button "Thêm vào giỏ" [ref=e79]:
                  - img [ref=e80]
                  - text: Thêm vào giỏ
              - generic [ref=e84]:
                - heading "Matcha Latte Premium" [level=3] [ref=e85]
                - paragraph [ref=e86]: Bột matcha Uji grade A đánh tan cùng sữa tươi Hokkaido. Có thể chọn nóng hoặc đá, thêm shot espresso.
              - generic [ref=e87]:
                - text: 52.000đ
                - link "Xem chi tiết" [ref=e88] [cursor=pointer]:
                  - /url: /menu/matcha-latte
                  - text: Xem chi tiết
                  - img [ref=e89]
            - generic [ref=e94]:
              - generic [ref=e95]:
                - img "Trà Xanh Sữa Thái Nguyên" [ref=e96]
                - generic [ref=e97]: Trà Xanh & Matcha
                - button "Thêm vào giỏ" [ref=e99]:
                  - img [ref=e100]
                  - text: Thêm vào giỏ
              - generic [ref=e104]:
                - heading "Trà Xanh Sữa Thái Nguyên" [level=3] [ref=e105]
                - paragraph [ref=e106]: Trà xanh Thái Nguyên hảo hạng pha sữa tươi, vị chát nhẹ hòa quyện béo ngậy, thêm đậu đỏ.
              - generic [ref=e107]:
                - text: 42.000đ
                - link "Xem chi tiết" [ref=e108] [cursor=pointer]:
                  - /url: /menu/tra-xanh-sua
                  - text: Xem chi tiết
                  - img [ref=e109]
            - generic [ref=e114]:
              - generic [ref=e115]:
                - img "Matcha Đậu Đỏ Nhật Bản" [ref=e116]
                - generic [ref=e117]: Trà Xanh & MatchaMới
                - button "Thêm vào giỏ" [ref=e119]:
                  - img [ref=e120]
                  - text: Thêm vào giỏ
              - generic [ref=e124]:
                - heading "Matcha Đậu Đỏ Nhật Bản" [level=3] [ref=e125]
                - paragraph [ref=e126]: Matcha kết hợp đậu đỏ Hokkaido ninh mềm 8 tiếng, vị ngọt thanh kiểu Nhật Bản truyền thống.
              - generic [ref=e127]:
                - text: 55.000đ
                - link "Xem chi tiết" [ref=e128] [cursor=pointer]:
                  - /url: /menu/matcha-dau-do
                  - text: Xem chi tiết
                  - img [ref=e129]
            - generic [ref=e134]:
              - generic [ref=e135]:
                - img "Matcha Cream Cheese" [ref=e136]
                - generic [ref=e137]: Trà Xanh & MatchaBest Seller
                - button "Thêm vào giỏ" [ref=e139]:
                  - img [ref=e140]
                  - text: Thêm vào giỏ
              - generic [ref=e144]:
                - heading "Matcha Cream Cheese" [level=3] [ref=e145]
                - paragraph [ref=e146]: Matcha đậm vị phủ lớp cream cheese béo mặn, tạo sự cân bằng hoàn hảo giữa đắng-ngọt-mặn.
              - generic [ref=e147]:
                - text: 55.000đ
                - link "Xem chi tiết" [ref=e148] [cursor=pointer]:
                  - /url: /menu/matcha-cream-cheese
                  - text: Xem chi tiết
                  - img [ref=e149]
            - generic [ref=e154]:
              - generic [ref=e155]:
                - img "Sữa Tươi Trân Châu Đường Nâu" [ref=e156]
                - generic [ref=e157]: Sữa Tươi & KemBest Seller
                - button "Thêm vào giỏ" [ref=e159]:
                  - img [ref=e160]
                  - text: Thêm vào giỏ
              - generic [ref=e164]:
                - heading "Sữa Tươi Trân Châu Đường Nâu" [level=3] [ref=e165]
                - paragraph [ref=e166]: Sữa tươi Mộc Châu nguyên chất 100% với trân châu đường nâu thủ công nấu mỗi ngày.
              - generic [ref=e167]:
                - text: 45.000đ
                - link "Xem chi tiết" [ref=e168] [cursor=pointer]:
                  - /url: /menu/sua-tuoi-tran-chau-duong-nau
                  - text: Xem chi tiết
                  - img [ref=e169]
            - generic [ref=e174]:
              - generic [ref=e175]:
                - img "Kem Sữa Dừa Tropical" [ref=e176]
                - generic [ref=e177]: Sữa Tươi & Kem
                - button "Thêm vào giỏ" [ref=e179]:
                  - img [ref=e180]
                  - text: Thêm vào giỏ
              - generic [ref=e184]:
                - heading "Kem Sữa Dừa Tropical" [level=3] [ref=e185]
                - paragraph [ref=e186]: Kem dừa Bến Tre béo ngậy kết hợp sữa tươi, thêm nước cốt dừa thơm lừng và topping dừa nạo.
              - generic [ref=e187]:
                - text: 48.000đ
                - link "Xem chi tiết" [ref=e188] [cursor=pointer]:
                  - /url: /menu/kem-sua-dua-tropical
                  - text: Xem chi tiết
                  - img [ref=e189]
            - generic [ref=e194]:
              - generic [ref=e195]:
                - img "Smoothie Dâu Tây Yogurt" [ref=e196]
                - generic [ref=e197]: Sữa Tươi & KemMới
                - button "Thêm vào giỏ" [ref=e199]:
                  - img [ref=e200]
                  - text: Thêm vào giỏ
              - generic [ref=e204]:
                - heading "Smoothie Dâu Tây Yogurt" [level=3] [ref=e205]
                - paragraph [ref=e206]: Dâu tây Đà Lạt tươi xay cùng yogurt Hy Lạp và đá, thêm whipping cream và granola.
              - generic [ref=e207]:
                - text: 52.000đ
                - link "Xem chi tiết" [ref=e208] [cursor=pointer]:
                  - /url: /menu/smoothie-dau-tay-yogurt
                  - text: Xem chi tiết
                  - img [ref=e209]
            - generic [ref=e214]:
              - generic [ref=e215]:
                - img "Oreo Cookie Cream" [ref=e216]
                - generic [ref=e217]: Sữa Tươi & Kem
                - button "Thêm vào giỏ" [ref=e219]:
                  - img [ref=e220]
                  - text: Thêm vào giỏ
              - generic [ref=e224]:
                - heading "Oreo Cookie Cream" [level=3] [ref=e225]
                - paragraph [ref=e226]: Sữa tươi blend cùng Oreo cookies, thêm kem vanilla và chocolate chips. Thức uống yêu thích của giới trẻ.
              - generic [ref=e227]:
                - text: 50.000đ
                - link "Xem chi tiết" [ref=e228] [cursor=pointer]:
                  - /url: /menu/oreo-cookie-cream
                  - text: Xem chi tiết
                  - img [ref=e229]
            - generic [ref=e234]:
              - generic [ref=e235]:
                - img "Brown Sugar Boba Milk" [ref=e236]
                - generic [ref=e237]: Đặc BiệtMớiBest Seller
                - button "Thêm vào giỏ" [ref=e239]:
                  - img [ref=e240]
                  - text: Thêm vào giỏ
              - generic [ref=e244]:
                - heading "Brown Sugar Boba Milk" [level=3] [ref=e245]
                - paragraph [ref=e246]: Sữa tươi nguyên chất với trân châu đường nâu caramel hóa thủ công, tạo vân hổ đặc trưng. Signature drink của Tiger Sugar.
              - generic [ref=e247]:
                - text: 55.000đ
                - link "Xem chi tiết" [ref=e248] [cursor=pointer]:
                  - /url: /menu/brown-sugar-boba-milk
                  - text: Xem chi tiết
                  - img [ref=e249]
            - generic [ref=e254]:
              - generic [ref=e255]:
                - img "Dirty Matcha Latte" [ref=e256]
                - generic [ref=e257]: Đặc BiệtMới
                - button "Thêm vào giỏ" [ref=e259]:
                  - img [ref=e260]
                  - text: Thêm vào giỏ
              - generic [ref=e264]:
                - heading "Dirty Matcha Latte" [level=3] [ref=e265]
                - paragraph [ref=e266]: Matcha Uji Nhật Bản cao cấp kết hợp double espresso shot, tạo nên sự tương phản độc đáo giữa đắng và ngọt.
              - generic [ref=e267]:
                - text: 58.000đ
                - link "Xem chi tiết" [ref=e268] [cursor=pointer]:
                  - /url: /menu/dirty-matcha-latte
                  - text: Xem chi tiết
                  - img [ref=e269]
            - generic [ref=e274]:
              - generic [ref=e275]:
                - img "Taro Cream Cheese" [ref=e276]
                - generic [ref=e277]: Đặc BiệtBest Seller
                - button "Thêm vào giỏ" [ref=e279]:
                  - img [ref=e280]
                  - text: Thêm vào giỏ
              - generic [ref=e284]:
                - heading "Taro Cream Cheese" [level=3] [ref=e285]
                - paragraph [ref=e286]: Khoai môn Đà Lạt tím xay mịn, phủ lớp kem cheese mặn ngọt hài hòa. Topping trân châu tím đặc biệt.
              - generic [ref=e287]:
                - text: 52.000đ
                - link "Xem chi tiết" [ref=e288] [cursor=pointer]:
                  - /url: /menu/taro-cream-cheese
                  - text: Xem chi tiết
                  - img [ref=e289]
            - generic [ref=e294]:
              - generic [ref=e295]:
                - img "Iku Cloud Nine" [ref=e296]
                - generic [ref=e297]: Đặc BiệtMới
                - button "Thêm vào giỏ" [ref=e299]:
                  - img [ref=e300]
                  - text: Thêm vào giỏ
              - generic [ref=e304]:
                - heading "Iku Cloud Nine" [level=3] [ref=e305]
                - paragraph [ref=e306]: Trà ô long đặc biệt với lớp foam kem tươi bồng bềnh như mây, rắc bột cacao Valrhona và caramel.
              - generic [ref=e307]:
                - text: 55.000đ
                - link "Xem chi tiết" [ref=e308] [cursor=pointer]:
                  - /url: /menu/iku-cloud-nine
                  - text: Xem chi tiết
                  - img [ref=e309]
            - generic [ref=e314]:
              - generic [ref=e315]:
                - img "Mochi Milk Tea" [ref=e316]
                - generic [ref=e317]: Đặc BiệtMới
                - button "Thêm vào giỏ" [ref=e319]:
                  - img [ref=e320]
                  - text: Thêm vào giỏ
              - generic [ref=e324]:
                - heading "Mochi Milk Tea" [level=3] [ref=e325]
                - paragraph [ref=e326]: Trà sữa Nhật Bản với mochi dẻo mềm handmade, nhân đậu đỏ Hokkaido, rắc bột kinako.
              - generic [ref=e327]:
                - text: 58.000đ
                - link "Xem chi tiết" [ref=e328] [cursor=pointer]:
                  - /url: /menu/mochi-milk-tea
                  - text: Xem chi tiết
                  - img [ref=e329]
            - generic [ref=e334]:
              - generic [ref=e335]:
                - img "Trà Đào Cam Sả" [ref=e336]
                - generic [ref=e337]: Trà Trái CâyBest Seller
                - button "Thêm vào giỏ" [ref=e339]:
                  - img [ref=e340]
                  - text: Thêm vào giỏ
              - generic [ref=e344]:
                - heading "Trà Đào Cam Sả" [level=3] [ref=e345]
                - paragraph [ref=e346]: Trà xanh kết hợp đào tươi miếng lớn, cam vàng tươi và sả thơm. Thanh mát, giải nhiệt tuyệt vời cho ngày hè.
              - generic [ref=e347]:
                - text: 45.000đ
                - link "Xem chi tiết" [ref=e348] [cursor=pointer]:
                  - /url: /menu/tra-dao-cam-sa
                  - text: Xem chi tiết
                  - img [ref=e349]
            - generic [ref=e354]:
              - generic [ref=e355]:
                - img "Trà Vải Lychee Rose" [ref=e356]
                - generic [ref=e357]: Trà Trái CâyMới
                - button "Thêm vào giỏ" [ref=e359]:
                  - img [ref=e360]
                  - text: Thêm vào giỏ
              - generic [ref=e364]:
                - heading "Trà Vải Lychee Rose" [level=3] [ref=e365]
                - paragraph [ref=e366]: Trà hoa hồng Bulgaria kết hợp vải thiều tươi Bắc Giang, thơm ngát và ngọt thanh tự nhiên.
              - generic [ref=e367]:
                - text: 48.000đ
                - link "Xem chi tiết" [ref=e368] [cursor=pointer]:
                  - /url: /menu/tra-vai-lychee-rose
                  - text: Xem chi tiết
                  - img [ref=e369]
            - generic [ref=e374]:
              - generic [ref=e375]:
                - img "Trà Chanh Dây Passion" [ref=e376]
                - generic [ref=e377]: Trà Trái Cây
                - button "Thêm vào giỏ" [ref=e379]:
                  - img [ref=e380]
                  - text: Thêm vào giỏ
              - generic [ref=e384]:
                - heading "Trà Chanh Dây Passion" [level=3] [ref=e385]
                - paragraph [ref=e386]: Chanh dây Đà Lạt tươi chua ngọt hài hòa, kết hợp trà xanh Thái Nguyên thanh mát, thêm hạt chia.
              - generic [ref=e387]:
                - text: 42.000đ
                - link "Xem chi tiết" [ref=e388] [cursor=pointer]:
                  - /url: /menu/tra-chanh-day-passion
                  - text: Xem chi tiết
                  - img [ref=e389]
            - generic [ref=e394]:
              - generic [ref=e395]:
                - img "Trà Xoài Tropical" [ref=e396]
                - generic [ref=e397]: Trà Trái Cây
                - button "Thêm vào giỏ" [ref=e399]:
                  - img [ref=e400]
                  - text: Thêm vào giỏ
              - generic [ref=e404]:
                - heading "Trà Xoài Tropical" [level=3] [ref=e405]
                - paragraph [ref=e406]: Xoài Cát Hòa Lộc chín mọng ngọt lịm kết hợp trà lài, mang hương vị nhiệt đới sảng khoái.
              - generic [ref=e407]:
                - text: 45.000đ
                - link "Xem chi tiết" [ref=e408] [cursor=pointer]:
                  - /url: /menu/tra-xoai-tropical
                  - text: Xem chi tiết
                  - img [ref=e409]
            - generic [ref=e414]:
              - generic [ref=e415]:
                - img "Trà Dâu Tây Tươi" [ref=e416]
                - generic [ref=e417]: Trà Trái CâyMới
                - button "Thêm vào giỏ" [ref=e419]:
                  - img [ref=e420]
                  - text: Thêm vào giỏ
              - generic [ref=e424]:
                - heading "Trà Dâu Tây Tươi" [level=3] [ref=e425]
                - paragraph [ref=e426]: Dâu tây Đà Lạt tươi nguyên trái kết hợp trà hồng, vị chua nhẹ ngọt thanh, thêm thạch dâu.
              - generic [ref=e427]:
                - text: 48.000đ
                - link "Xem chi tiết" [ref=e428] [cursor=pointer]:
                  - /url: /menu/tra-dau-tay-tuoi
                  - text: Xem chi tiết
                  - img [ref=e429]
            - generic [ref=e434]:
              - generic [ref=e435]:
                - img "Trà Sữa Iku Signature" [ref=e436]
                - generic [ref=e437]: Trà Sữa Truyền ThốngBest Seller
                - button "Thêm vào giỏ" [ref=e439]:
                  - img [ref=e440]
                  - text: Thêm vào giỏ
              - generic [ref=e444]:
                - heading "Trà Sữa Iku Signature" [level=3] [ref=e445]
                - paragraph [ref=e446]: Trà đen Ceylon pha sữa tươi nguyên chất, vị đậm đà hài hòa. Thức uống signature với công thức độc quyền, kèm trân châu hoàng kim.
              - generic [ref=e447]:
                - text: 45.000đ
                - link "Xem chi tiết" [ref=e448] [cursor=pointer]:
                  - /url: /menu/tra-sua-iku-signature
                  - text: Xem chi tiết
                  - img [ref=e449]
            - generic [ref=e454]:
              - generic [ref=e455]:
                - img "Trà Sữa Trân Châu Hoàng Kim" [ref=e456]
                - generic [ref=e457]: Trà Sữa Truyền ThốngMớiBest Seller
                - button "Thêm vào giỏ" [ref=e459]:
                  - img [ref=e460]
                  - text: Thêm vào giỏ
              - generic [ref=e464]:
                - heading "Trà Sữa Trân Châu Hoàng Kim" [level=3] [ref=e465]
                - paragraph [ref=e466]: Trà sữa đậm đà kết hợp trân châu hoàng kim dẻo thơm, phủ lớp kem cheese béo ngậy. Best seller tại tất cả chi nhánh.
              - generic [ref=e467]:
                - text: 55.000đ
                - link "Xem chi tiết" [ref=e468] [cursor=pointer]:
                  - /url: /menu/tra-sua-tran-chau-hoang-kim
                  - text: Xem chi tiết
                  - img [ref=e469]
            - generic [ref=e474]:
              - generic [ref=e475]:
                - img "Hồng Trà Sữa" [ref=e476]
                - generic [ref=e477]: Trà Sữa Truyền Thống
                - button "Thêm vào giỏ" [ref=e479]:
                  - img [ref=e480]
                  - text: Thêm vào giỏ
              - generic [ref=e484]:
                - heading "Hồng Trà Sữa" [level=3] [ref=e485]
                - paragraph [ref=e486]: Hồng trà Ceylon thượng hạng pha cùng sữa tươi Mộc Châu, hương thơm nhẹ nhàng thanh tao, vị ngọt dịu tự nhiên.
              - generic [ref=e487]:
                - text: 42.000đ
                - link "Xem chi tiết" [ref=e488] [cursor=pointer]:
                  - /url: /menu/hong-tra-sua
                  - text: Xem chi tiết
                  - img [ref=e489]
            - generic [ref=e494]:
              - generic [ref=e495]:
                - img "Trà Sữa Ô Long Nướng" [ref=e496]
                - generic [ref=e497]: Trà Sữa Truyền Thống
                - button "Thêm vào giỏ" [ref=e499]:
                  - img [ref=e500]
                  - text: Thêm vào giỏ
              - generic [ref=e504]:
                - heading "Trà Sữa Ô Long Nướng" [level=3] [ref=e505]
                - paragraph [ref=e506]: Trà Ô Long Đài Loan rang nhẹ trên than hồng, kết hợp sữa tươi tạo nên hương vị thanh mát đặc trưng khó quên.
              - generic [ref=e507]:
                - text: 48.000đ
                - link "Xem chi tiết" [ref=e508] [cursor=pointer]:
                  - /url: /menu/tra-sua-o-long-nuong
                  - text: Xem chi tiết
                  - img [ref=e509]
            - generic [ref=e514]:
              - generic [ref=e515]:
                - img "Trà Sữa Socola Bỉ" [ref=e516]
                - generic [ref=e517]: Trà Sữa Truyền Thống
                - button "Thêm vào giỏ" [ref=e519]:
                  - img [ref=e520]
                  - text: Thêm vào giỏ
              - generic [ref=e524]:
                - heading "Trà Sữa Socola Bỉ" [level=3] [ref=e525]
                - paragraph [ref=e526]: Socola Bỉ Callebaut nguyên chất hòa quyện cùng trà sữa, đậm đà và ngọt ngào, thêm whipping cream.
              - generic [ref=e527]:
                - text: 50.000đ
                - link "Xem chi tiết" [ref=e528] [cursor=pointer]:
                  - /url: /menu/tra-sua-socola-bi
                  - text: Xem chi tiết
                  - img [ref=e529]
            - generic [ref=e534]:
              - generic [ref=e535]:
                - img "Trà Sữa Hokkaido" [ref=e536]
                - generic [ref=e537]: Trà Sữa Truyền ThốngMới
                - button "Thêm vào giỏ" [ref=e539]:
                  - img [ref=e540]
                  - text: Thêm vào giỏ
              - generic [ref=e544]:
                - heading "Trà Sữa Hokkaido" [level=3] [ref=e545]
                - paragraph [ref=e546]: Công thức trà sữa Nhật Bản với sữa Hokkaido béo ngậy, trà đen Assam đậm vị, caramel nhẹ.
              - generic [ref=e547]:
                - text: 52.000đ
                - link "Xem chi tiết" [ref=e548] [cursor=pointer]:
                  - /url: /menu/tra-sua-hokkaido
                  - text: Xem chi tiết
                  - img [ref=e549]
    - contentinfo [ref=e551]:
      - generic [ref=e552]:
        - generic [ref=e553]:
          - generic [ref=e554]:
            - link "I MilkTea IkuPremium Boba Tea" [ref=e555] [cursor=pointer]:
              - /url: /
              - generic [ref=e556]: I
              - generic [ref=e557]: MilkTea IkuPremium Boba Tea
            - paragraph [ref=e558]: Thương hiệu trà sữa premium với nguyên liệu tươi ngon nhập khẩu, mang đến trải nghiệm thưởng thức đẳng cấp cho giới trẻ Việt Nam.
            - generic [ref=e559]:
              - link "Facebook" [ref=e560] [cursor=pointer]:
                - /url: "#"
                - img [ref=e561]
              - link "Instagram" [ref=e563] [cursor=pointer]:
                - /url: "#"
                - img [ref=e564]
          - generic [ref=e567]:
            - heading "Menu" [level=4] [ref=e568]
            - list [ref=e569]:
              - listitem [ref=e570]:
                - link "Trà Sữa Truyền Thống" [ref=e571] [cursor=pointer]:
                  - /url: /menu?category=tra-sua-truyen-thong
                  - text: Trà Sữa Truyền Thống
              - listitem [ref=e572]:
                - link "Trà Trái Cây" [ref=e573] [cursor=pointer]:
                  - /url: /menu?category=tra-trai-cay
                  - text: Trà Trái Cây
              - listitem [ref=e574]:
                - link "Đặc Biệt Premium" [ref=e575] [cursor=pointer]:
                  - /url: /menu?category=dac-biet
                  - text: Đặc Biệt Premium
              - listitem [ref=e576]:
                - link "Matcha Series" [ref=e577] [cursor=pointer]:
                  - /url: /menu?category=tra-xanh-matcha
                  - text: Matcha Series
              - listitem [ref=e578]:
                - link "Cà Phê Sữa" [ref=e579] [cursor=pointer]:
                  - /url: /menu?category=ca-phe
                  - text: Cà Phê Sữa
          - generic [ref=e580]:
            - heading "Về Iku" [level=4] [ref=e581]
            - list [ref=e582]:
              - listitem [ref=e583]:
                - link "Câu chuyện thương hiệu" [ref=e584] [cursor=pointer]:
                  - /url: /about
                  - text: Câu chuyện thương hiệu
              - listitem [ref=e585]:
                - link "Nguyên liệu tươi sạch" [ref=e586] [cursor=pointer]:
                  - /url: /about
                  - text: Nguyên liệu tươi sạch
              - listitem [ref=e587]:
                - link "Tuyển dụng" [ref=e588] [cursor=pointer]:
                  - /url: /about
                  - text: Tuyển dụng
              - listitem [ref=e589]:
                - link "Tra cứu đơn hàng" [ref=e590] [cursor=pointer]:
                  - /url: /order
                  - text: Tra cứu đơn hàng
          - generic [ref=e591]:
            - heading "Chính sách" [level=4] [ref=e592]
            - list [ref=e593]:
              - listitem [ref=e594]:
                - link "Chính sách bảo mật" [ref=e595] [cursor=pointer]:
                  - /url: /privacy
                  - text: Chính sách bảo mật
              - listitem [ref=e596]:
                - link "Điều khoản sử dụng" [ref=e597] [cursor=pointer]:
                  - /url: /terms
                  - text: Điều khoản sử dụng
              - listitem [ref=e598]:
                - link "Chính sách giao hàng" [ref=e599] [cursor=pointer]:
                  - /url: /delivery
                  - text: Chính sách giao hàng
              - listitem [ref=e600]:
                - link "Câu hỏi thường gặp" [ref=e601] [cursor=pointer]:
                  - /url: /faq
                  - text: Câu hỏi thường gặp
          - generic [ref=e602]:
            - heading "Liên hệ" [level=4] [ref=e603]
            - list [ref=e604]:
              - listitem [ref=e605]:
                - img [ref=e606]
                - text: 123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
              - listitem [ref=e609]:
                - img [ref=e610]
                - text: 1900 1234
              - listitem [ref=e612]:
                - img [ref=e613]
                - text: hello@milktea-iku.vn
              - listitem [ref=e616]:
                - img [ref=e617]
                - text: 8:00 - 22:00 hàng ngày
        - region "Nhận ưu đãi mỗi tuần" [ref=e621]:
          - img [ref=e623]
          - generic [ref=e633]:
            - generic [ref=e634]: Bản tin hàng tuần
            - heading "Nhận ưu đãi mỗi tuần" [level=2] [ref=e635]
            - paragraph [ref=e636]: Đăng ký để nhận ưu đãi độc quyền, thông báo sản phẩm mới và bí quyết pha trà sữa ngay trong hộp thư của bạn.
            - generic [ref=e637]:
              - generic [ref=e638]:
                - generic [ref=e639]:
                  - text: Địa chỉ email
                  - textbox "Địa chỉ email" [ref=e640]:
                    - /placeholder: email@cua-ban.com
                - button "Đăng ký nhận bản tin" [ref=e641]: Đăng ký
              - paragraph [ref=e642]: Không spam. Hủy đăng ký bất cứ lúc nào.
        - generic [ref=e643]:
          - paragraph [ref=e644]: © 2026 MilkTea Iku. All rights reserved.
          - paragraph [ref=e645]:
            - text: Made with
            - img [ref=e646]
            - text: in Saigon
  - navigation [ref=e648]:
    - generic [ref=e649]:
      - link "Trang chủ" [ref=e650] [cursor=pointer]:
        - /url: /
        - img [ref=e652]
        - text: Trang chủ
      - link "Menu" [ref=e655] [cursor=pointer]:
        - /url: /menu
        - img [ref=e657]
        - text: Menu
      - link "Ưu đãi" [ref=e659] [cursor=pointer]:
        - /url: /promotions
        - img [ref=e661]
        - text: Ưu đãi
      - link "Đơn hàng" [ref=e664] [cursor=pointer]:
        - /url: /tracking
        - img [ref=e666]
        - text: Đơn hàng
      - link "Cửa hàng" [ref=e669] [cursor=pointer]:
        - /url: /stores
        - img [ref=e671]
        - text: Cửa hàng
  - generic "Thông báo"
  - button "Mở tìm kiếm" [ref=e674]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Full Order Flow", () => {
  4  |   test("complete order from menu to confirmation", async ({ page }) => {
  5  |     // Step 1: Browse menu
  6  |     await page.goto("/menu");
  7  |     await page.waitForLoadState("networkidle");
  8  | 
  9  |     // Step 2: Click on a product
  10 |     const productLink = page.locator('a[href*="/menu/"]').first();
  11 |     await expect(productLink).toBeVisible({ timeout: 10000 });
> 12 |     await productLink.click();
     |                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
  13 |     await page.waitForLoadState("networkidle");
  14 | 
  15 |     // Step 3: Add to cart
  16 |     const addToCartBtn = page.locator('button:has-text("Thêm vào giỏ")').first();
  17 |     if (await addToCartBtn.isVisible({ timeout: 5000 })) {
  18 |       await addToCartBtn.click();
  19 |       await page.waitForTimeout(1000);
  20 |     }
  21 | 
  22 |     // Step 4: Go to checkout
  23 |     await page.goto("/checkout");
  24 |     await page.waitForLoadState("networkidle");
  25 |     await expect(page.locator("main")).toBeVisible();
  26 |   });
  27 | 
  28 |   test("search for product and navigate", async ({ page }) => {
  29 |     await page.goto("/");
  30 | 
  31 |     // Open search
  32 |     const searchBtn = page.locator('[aria-label="Tìm kiếm"]').first();
  33 |     if (await searchBtn.isVisible()) {
  34 |       await searchBtn.click();
  35 |       await page.waitForTimeout(500);
  36 | 
  37 |       // Type search query
  38 |       const searchInput = page.locator('input[placeholder*="Tìm"]').first();
  39 |       if (await searchInput.isVisible()) {
  40 |         await searchInput.fill("matcha");
  41 |         await page.waitForTimeout(1000);
  42 |       }
  43 |     }
  44 |   });
  45 | 
  46 |   test("view order tracking page", async ({ page }) => {
  47 |     await page.goto("/tracking");
  48 |     await expect(page.locator("main")).toBeVisible();
  49 |   });
  50 | 
  51 |   test("view promotions page", async ({ page }) => {
  52 |     await page.goto("/promotions");
  53 |     await expect(page.locator("main")).toBeVisible();
  54 |   });
  55 | 
  56 |   test("view about page", async ({ page }) => {
  57 |     await page.goto("/about");
  58 |     await expect(page.locator("main")).toBeVisible();
  59 |   });
  60 | 
  61 |   test("view stores page", async ({ page }) => {
  62 |     await page.goto("/stores");
  63 |     await expect(page.locator("main")).toBeVisible();
  64 |   });
  65 | });
  66 | 
```