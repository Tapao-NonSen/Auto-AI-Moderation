import Component from 'flarum/common/Component';
import Select from 'flarum/common/components/Select';

export default class CategoryThresholdRow extends Component {
    view() {
        const { category, threshold, action } = this.attrs;
        const currentThreshold = parseFloat(threshold() || '0.80');

        return (
            <div
                className="CategoryThresholdRow"
                style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}
            >
                <span style={{ width: '200px', fontWeight: 500 }}>{category}</span>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={currentThreshold}
                    oninput={(e: Event) => threshold((e.target as HTMLInputElement).value)}
                    style={{ width: '200px' }}
                />
                <span style={{ width: '40px' }}>{currentThreshold.toFixed(2)}</span>

                <Select
                    value={action() || 'flag'}
                    onchange={action}
                    options={{ flag: 'Flag', hide: 'Hide', delete: 'Delete', warn: 'Warn', none: 'None' }}
                />
            </div>
        );
    }
}
