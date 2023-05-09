type IconProps = {
  width?: number,
  height?: number,
  className?: string,
  color?: string,
  viewBox?: string,
}

type Register = {
  Compania: string,
  No_batch: number,
  PERIODO: number,
  Tipo: string,
  FECHA: string,
  Documento: number,
  Cuenta: string,
  N_Dir: number,
  Descripcion: string,
  Monto: number,
  Ult_Act: number,
  Moneda: string,
  glexa: string,
  DocRef1: string,
  Tipo_Batch: string,
}

type NotificationProps = {
  show: boolean,
  type: "success" | "warning" | "danger",
  title: string,
  message: string,
}

type OpenNotificationProps = Omit<NotificationProps, "show">

interface NotificationModalProps extends NotificationProps {
  closeNotification: MouseEventHandler<HTMLButtonElement>
}