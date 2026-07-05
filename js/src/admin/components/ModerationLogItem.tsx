import app from 'flarum/admin/app';
import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';

export default class ModerationLogItem extends Component {
    view() {
        const { log, onReview } = this.attrs;
        const attrs    = log.attributes || {};
        const scores   = attrs.categoryScores || {};
        const topCat   = Object.entries(scores).sort((a: any, b: any) => b[1] - a[1])[0];
        const reviewed = attrs.reviewedAt != null;
        const decision = attrs.reviewDecision;

        return (
            <tr className={`ModerationLogItem ${reviewed ? 'reviewed' : 'pending'}`}>
                <td>{attrs.contentType}</td>
                <td>{attrs.contentId}</td>
                <td>{attrs.field}</td>
                <td>{topCat?.[0] ?? '—'}</td>
                <td>{topCat ? (parseFloat(topCat[1] as string) * 100).toFixed(0) + '%' : '—'}</td>
                <td>{attrs.actionTaken ?? '—'}</td>
                <td>
                    {reviewed ? (
                        <span className={`ReviewDecision ReviewDecision--${decision}`}>
                            {decision === 'approved'
                                ? app.translator.trans('tapao-moderationai.admin.log.decision_approved')
                                : app.translator.trans('tapao-moderationai.admin.log.decision_rejected')}
                        </span>
                    ) : (
                        <>
                            <Button
                                className="Button Button--success"
                                onclick={() => this.approve(log.id, onReview)}
                            >
                                {app.translator.trans('tapao-moderationai.admin.log.approve')}
                            </Button>
                            {' '}
                            <Button
                                className="Button Button--danger"
                                onclick={() => this.reject(log.id, onReview)}
                            >
                                {app.translator.trans('tapao-moderationai.admin.log.reject')}
                            </Button>
                        </>
                    )}
                </td>
            </tr>
        );
    }

    async approve(id: string, onReview: () => void) {
        try {
            await app.request({
                method: 'PATCH',
                url: app.forum.attribute('apiUrl') + `/moderation-logs/${id}`,
                body: {
                    data: {
                        type: 'moderation-logs',
                        id: id,
                        attributes: {
                            reviewDecision: 'approved'
                        }
                    }
                }
            });
        } finally {
            onReview();
        }
    }

    async reject(id: string, onReview: () => void) {
        try {
            await app.request({
                method: 'PATCH',
                url: app.forum.attribute('apiUrl') + `/moderation-logs/${id}`,
                body: {
                    data: {
                        type: 'moderation-logs',
                        id: id,
                        attributes: {
                            reviewDecision: 'rejected'
                        }
                    }
                }
            });
        } finally {
            onReview();
        }
    }
}
