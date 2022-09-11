import joplin from 'api';
import { ToolbarButtonLocation } from 'api/types';

function getDayOffsetFromToday(offset: number): Date {
	const date = new Date();
	date.setDate(date.getDate() + offset);
	return date;
}

joplin.plugins.register({
	onStart: async function() {

		const dialogs = joplin.views.dialogs;
		const dialogHandle = await dialogs.create('chooseWeekDialog');
		await dialogs.setHtml(dialogHandle, "Start from which Monday?");

		await joplin.commands.register({
			name: 'seedAgenda',
			label: 'Pre-fill agenda template for a given week',
			iconName: 'fa fa-tasks',
			execute: async () => {

				const today = new Date();
				const nextMon = getDayOffsetFromToday(((8-today.getDay())%7));
				const prevMon = getDayOffsetFromToday(((1-today.getDay())%7));

				const buttons = [
					{id:'prev', title:prevMon.toDateString()},
					{id:'next', title:nextMon.toDateString()},
					{id:'cancel', title:'Cancel'}
				];

				const buttonIdToDate = {
					'prev': prevMon,
					'next': nextMon,
				};

				await dialogs.setButtons(dialogHandle, buttons);

				const choice = await dialogs.open(dialogHandle);

				if (choice.id == 'cancel') return;

				const numDaysToCover = 5;
				const d = buttonIdToDate[choice.id];
				d.setDate(d.getDate()+numDaysToCover-1);
				let textToInsert = '';
				for (let i=0; i<numDaysToCover; ++i) {
					const s = d.toDateString();
					textToInsert += `**${s}**\n- [ ] add some tasks\n`;
					if (i!=numDaysToCover-1)
						textToInsert += '\n';
					d.setDate(d.getDate()-1);
				}
				await joplin.commands.execute('insertText', textToInsert);
			},
		});

		await joplin.views.toolbarButtons.create('seedAgenda','seedAgenda', ToolbarButtonLocation.EditorToolbar);

	},
});