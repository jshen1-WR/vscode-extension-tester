import { expect } from 'chai';
import { BottomBarPanel, WebElement } from 'vscode-extension-tester';

describe('BottomBarPanel', () => {
    let panel: BottomBarPanel;

    before(async () => {
        panel = new BottomBarPanel();
    });

    after(async () => {
        await panel.toggle(false);
    });

    it('can be toggled open', async () => {
        await panel.toggle(true);
        expect(await panel.isDisplayed()).is.true;
    });

    it('can be toggled closed', async () => {
        await panel.toggle(true);
        await panel.toggle(false);
        expect(await panel.isDisplayed()).is.false;
    });

    it('can be maximized and restored', async () => {
        await panel.toggle(true);
        const initHeight = await getHeight(panel);

        await panel.maximize();
        const maxHeight = await getHeight(panel);
        expect(maxHeight).greaterThan(initHeight);

        await panel.restore();
        const restoredHeight = await getHeight(panel);
        expect(initHeight).equals(restoredHeight);
    });

    it('can open problems view', async () => {
        const view = await panel.openProblemsView();
        expect(await view.isDisplayed()).is.true;
    });

    it('can open output view', async () => {
        const view = await panel.openOutputView();
        expect(await view.isDisplayed()).is.true;
    });

    it('can open debug console view', async () => {
        const view = await panel.openDebugConsoleView();
        expect(await view.isDisplayed()).is.true;
    });

    it('can open terminal view', async () => {
        const view = await panel.openTerminalView();
        expect(await view.isDisplayed()).is.true;
    });
});

async function getHeight(element: WebElement): Promise<number> {
    const css = await element.getCssValue('height');
    const match = css.match(/(\d+)\s?px/) as RegExpMatchArray;
    return +match[1];
}