import app from 'flarum/admin/app';
import ModerationSettingsPage from './components/ModerationSettingsPage';

app.initializers.add('tapao-moderationai', () => {
    app.extensionData
        .for('tapao-moderationai')
        .registerPage(ModerationSettingsPage);
});
