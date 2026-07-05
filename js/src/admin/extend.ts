import Extend from 'flarum/common/extenders';
import ModerationSettingsPage from './components/ModerationSettingsPage';

export default [
    new Extend.Admin()
        .page(ModerationSettingsPage)
];
