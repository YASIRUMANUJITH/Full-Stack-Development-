import './OfflineBanner.css'

export default function OfflineBanner({ onDismiss }) {
  return (
    <div className="offline-banner" role="status">
      <span className="offline-banner-text">
        You are offline — showing the last synced data. Changes will not be saved until you reconnect.
      </span>
      <button type="button" className="offline-banner-dismiss" onClick={onDismiss} aria-label="Dismiss">
        &times;
      </button>
    </div>
  )
}
