console.log('Threads Fixer: Script START');

function simulateClick(element) {
    if (!element) return;
    ['mousedown', 'mouseup', 'click'].forEach(type => {
        const e = new MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            view: window,
            buttons: 1
        });
        element.dispatchEvent(e);
    });
}

// 最初の注入時に少し待ってから実行
let isInitialRun = true;

setInterval(() => {
    // 1. URLチェック
    if (window.location.pathname !== '/' && window.location.pathname !== '') return;

    // 2. 「おすすめ」リンクがあるか（おすすめ表示中）
    const forYou = document.querySelector('a[href="/for_you"]');

    // おすすめ表示中でなければ何もしない
    // ただし、フォロー中表示中でもメニューが開いている可能性がある（ユーザー操作などで）
    // その場合は触らない方が安全だが、ここでは「おすすめからフォロー中への切り替え」を優先
    if (!forYou) return;

    // 既にフォロー中選択済みか（aria-selected等の属性チェックは省略し、for_youが存在する時点でおすすめとみなす）

    // 3. メニューが開いているかチェック
    const followingLink = document.querySelector('a[href="/following"]');

    if (followingLink) {
        console.log('Threads Fixer: Menu open, clicking "Following"...');
        simulateClick(followingLink);
        return;
    }

    // 4. メニューを開く
    // アイコンから親を遡る
    let menuBtn = null;
    const icon = document.querySelector('svg[aria-label="もっと見る"]');

    if (icon) {
        let p = icon.parentElement;
        while (p && p !== document.body) {
            if (p.getAttribute('role') === 'button') {
                menuBtn = p;
                break;
            }
            p = p.parentElement;
        }

        // どうしてもrole=buttonが見つからない場合
        if (!menuBtn) menuBtn = icon.parentElement;
    }

    if (menuBtn) {
        // 初回ロード時は少し待つ（Reactのハイドレーション待ち）
        if (isInitialRun) {
            isInitialRun = false;
            // 何もしないで次のループへ（1回待つ）
            return;
        }

        console.log('Threads Fixer: Opening menu...');
        simulateClick(menuBtn);

        // メニューが開くまで待つ（短縮）
        // 次のループ（1秒後）まで待たずに、少し待ってから再チェックしてクリック
        setTimeout(() => {
            const link = document.querySelector('a[href="/following"]');
            if (link) {
                simulateClick(link);
            }
        }, 300); // 300ms待機
    }

}, 1000); // 1秒ごとにチェック（反応速度向上）
