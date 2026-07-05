import app from 'flarum/admin/app';
import ModerationSettingsPage from './src/admin/components/ModerationSettingsPage';

export { default as extend } from './src/admin/extend';

app.initializers.add('tapao-moderationai', () => {
  app.extensionData
    .for('tapao-moderationai')
    .registerPage(ModerationSettingsPage);
});
