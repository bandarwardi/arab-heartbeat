import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppShell } from "@/components/app/AppShell";
import { getDb } from "@/lib/firebase";
import type { UserProfile } from "@/contexts/AuthContext";
import {
  Loader2,
  Users,
  Shield,
  Sparkles,
  UserCheck,
  CreditCard,
  Plus,
  Trash2,
  Edit3,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "لوحة الأدمن — EN TEC" }] }),
});

function AdminPage() {
  return (
    <ProtectedRoute requireAdmin>
      <AppShell>
        <Inner />
      </AppShell>
    </ProtectedRoute>
  );
}

interface DBPlan {
  id: string;
  title: string;
  durationLabel: string;
  basePrice: number;
  badge?: string;
  highlight?: boolean;
  perks: string[];
  connections?: number;
  paddlePriceId?: string;
}

function Inner() {
  const [users, setUsers] = useState<UserProfile[] | null>(null);
  const [plans, setPlans] = useState<DBPlan[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // User Update States
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Plan Dialog States
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [planTitle, setPlanTitle] = useState("");
  const [planDuration, setPlanDuration] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [planBadge, setPlanBadge] = useState("");
  const [planHighlight, setPlanHighlight] = useState(false);
  const [planConnections, setPlanConnections] = useState("1");
  const [planPaddlePriceId, setPlanPaddlePriceId] = useState("");
  const [planPerks, setPlanPerks] = useState<string[]>([""]);
  const [savingPlan, setSavingPlan] = useState(false);

  const fetchUsers = async () => {
    try {
      const db = getDb();
      const snap = await getDocs(collection(db, "users"));
      setUsers(snap.docs.map((d) => d.data() as UserProfile));
    } catch (e) {
      setError(e instanceof Error ? e.message : "فشل تحميل المستخدمين");
    }
  };

  const fetchPlans = async () => {
    try {
      const db = getDb();
      const snap = await getDocs(collection(db, "plans"));
      setPlans(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }) as DBPlan)
      );
    } catch (e) {
      toast.error("فشل تحميل خطط الاشتراك");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPlans();
  }, []);

  const stats = useMemo(() => {
    if (!users) return null;
    const total = users.length;
    const active = users.filter(
      (u) => u.subscriptionStatus === "active" || u.subscriptionStatus === "trialing"
    ).length;
    const canceled = users.filter(
      (u) => u.subscriptionStatus === "canceled" || u.subscriptionStatus === "past_due"
    ).length;
    const free = total - active - canceled;

    return { total, active, canceled, free };
  }, [users]);

  async function handleUpdateSubscription(userId: string, newStatus: UserProfile["subscriptionStatus"]) {
    setUpdatingId(userId);
    try {
      const db = getDb();
      await updateDoc(doc(db, "users", userId), {
        subscriptionStatus: newStatus,
        subscriptionUpdatedAt: serverTimestamp(),
      });
      
      setUsers((prev) => {
        if (!prev) return null;
        return prev.map((u) => (u.uid === userId ? { ...u, subscriptionStatus: newStatus } : u));
      });
      
      toast.success("تم تحديث حالة الاشتراك بنجاح 🎉");
    } catch (e) {
      toast.error("فشل تحديث حالة الاشتراك");
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  }

  // Plan Handlers
  function openAddDialog() {
    setEditingPlanId(null);
    setPlanTitle("");
    setPlanDuration("");
    setPlanPrice("");
    setPlanBadge("");
    setPlanHighlight(false);
    setPlanConnections("1");
    setPlanPaddlePriceId("");
    setPlanPerks([""]);
    setDialogOpen(true);
  }

  function openEditDialog(plan: DBPlan) {
    setEditingPlanId(plan.id);
    setPlanTitle(plan.title);
    setPlanDuration(plan.durationLabel);
    setPlanPrice(plan.basePrice.toString());
    setPlanBadge(plan.badge || "");
    setPlanHighlight(!!plan.highlight);
    setPlanConnections((plan.connections || 1).toString());
    setPlanPaddlePriceId(plan.paddlePriceId || "");
    setPlanPerks(plan.perks.length > 0 ? plan.perks : [""]);
    setDialogOpen(true);
  }

  async function handleSavePlan(e: React.FormEvent) {
    e.preventDefault();
    if (!planTitle || !planDuration || !planPrice) {
      toast.error("يرجى ملء الحقول المطلوبة");
      return;
    }

    setSavingPlan(true);
    try {
      const db = getDb();
      const filteredPerks = planPerks.filter((p) => p.trim() !== "");
      const planData = {
        title: planTitle,
        durationLabel: planDuration,
        basePrice: Number(planPrice),
        badge: planBadge || null,
        highlight: planHighlight,
        connections: Number(planConnections),
        paddlePriceId: planPaddlePriceId || null,
        perks: filteredPerks.length > 0 ? filteredPerks : ["جودة بث فائقة الوضوح"],
      };

      if (editingPlanId) {
        await updateDoc(doc(db, "plans", editingPlanId), planData);
        toast.success("تم تحديث الخطة بنجاح 🎉");
      } else {
        await addDoc(collection(db, "plans"), {
          ...planData,
          createdAt: serverTimestamp(),
        });
        toast.success("تمت إضافة الخطة بنجاح 🎉");
      }

      setDialogOpen(false);
      fetchPlans();
    } catch (e) {
      toast.error("فشل في حفظ البيانات");
      console.error(e);
    } finally {
      setSavingPlan(false);
    }
  }

  async function handleDeletePlan(planId: string) {
    if (!confirm("هل أنت متأكد من رغبتك في حذف هذه الخطة؟")) return;
    try {
      const db = getDb();
      await deleteDoc(doc(db, "plans", planId));
      toast.success("تم حذف الخطة بنجاح");
      fetchPlans();
    } catch (e) {
      toast.error("فشل حذف الخطة");
      console.error(e);
    }
  }

  function addPerkField() {
    setPlanPerks((prev) => [...prev, ""]);
  }

  function removePerkField(index: number) {
    if (planPerks.length === 1) return;
    setPlanPerks((prev) => prev.filter((_, i) => i !== index));
  }

  function handlePerkChange(index: number, val: string) {
    setPlanPerks((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  }

  function getStatusBadge(status: UserProfile["subscriptionStatus"]) {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
            نشط
          </Badge>
        );
      case "trialing":
        return (
          <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-400">
            تجريبي
          </Badge>
        );
      case "canceled":
        return (
          <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-400">
            ملغى
          </Badge>
        );
      case "past_due":
        return (
          <Badge variant="outline" className="border-rose-500/30 bg-rose-500/10 text-rose-400">
            metأخر الدفع
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="border-white/10 bg-white/5 text-muted-foreground">
            بدون اشتراك
          </Badge>
        );
    }
  }

  function getRoleBadge(role: UserProfile["role"]) {
    if (role === "admin") {
      return (
        <Badge variant="outline" className="border-purple-500/30 bg-purple-500/10 text-purple-400">
          أدمن
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="bg-white/5 text-muted-foreground border-transparent">
        مستخدم
      </Badge>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">لوحة التحكم والأدمن</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          إدارة حسابات وأدوار المستخدمين وتعديل خطط وباقات الاشتراك ديناميكياً.
        </p>
      </div>

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <Tabs defaultValue="users" className="w-full space-y-6">
        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
          <TabsTrigger value="users" className="flex items-center gap-2 px-4 py-2">
            <Users className="h-4 w-4" />
            المستخدمين
          </TabsTrigger>
          <TabsTrigger value="plans" className="flex items-center gap-2 px-4 py-2">
            <CreditCard className="h-4 w-4" />
            خطط الاشتراك
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Users */}
        <TabsContent value="users" className="space-y-6 outline-none">
          {!users && !error && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> جارٍ التحميل...
            </div>
          )}

          {stats && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-white/5 bg-card/25 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between text-muted-foreground text-sm">
                  <span>إجمالي الأعضاء</span>
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <p className="mt-2 text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-card/25 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between text-muted-foreground text-sm">
                  <span>الاشتراكات النشطة</span>
                  <UserCheck className="h-4 w-4 text-emerald-400" />
                </div>
                <p className="mt-2 text-2xl font-bold text-emerald-400">{stats.active}</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-card/25 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between text-muted-foreground text-sm">
                  <span>اشتراكات ملغاة / متأخرة</span>
                  <Shield className="h-4 w-4 text-rose-400" />
                </div>
                <p className="mt-2 text-2xl font-bold text-rose-400">{stats.canceled}</p>
              </div>
              <div className="rounded-xl border border-white/5 bg-card/25 p-5 backdrop-blur-sm">
                <div className="flex items-center justify-between text-muted-foreground text-sm">
                  <span>أعضاء بدون اشتراك</span>
                  <Sparkles className="h-4 w-4 text-amber-400" />
                </div>
                <p className="mt-2 text-2xl font-bold text-amber-400">{stats.free}</p>
              </div>
            </div>
          )}

          {users && (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-card/40">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-right">
                  <tr>
                    <th className="px-4 py-3">الاسم</th>
                    <th className="px-4 py-3">البريد الإلكتروني</th>
                    <th className="px-4 py-3">الدور</th>
                    <th className="px-4 py-3">حالة الاشتراك</th>
                    <th className="px-4 py-3">تعديل الاشتراك</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.uid} className="border-t border-white/5 transition hover:bg-white/[0.01]">
                      <td className="px-4 py-3 font-medium text-foreground">
                        {u.displayName ?? "-"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                      <td className="px-4 py-3">{getRoleBadge(u.role)}</td>
                      <td className="px-4 py-3">{getStatusBadge(u.subscriptionStatus)}</td>
                      <td className="px-4 py-3 min-w-[180px]">
                        <Select
                          value={u.subscriptionStatus || "none"}
                          disabled={updatingId === u.uid}
                          onValueChange={(val) =>
                            handleUpdateSubscription(u.uid, val as UserProfile["subscriptionStatus"])
                          }
                        >
                          <SelectTrigger className="w-full h-8 bg-background/40 border-white/5 cursor-pointer text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">بدون اشتراك (None)</SelectItem>
                            <SelectItem value="active">نشط (Active)</SelectItem>
                            <SelectItem value="trialing">تجريبي (Trialing)</SelectItem>
                            <SelectItem value="canceled">ملغى (Canceled)</SelectItem>
                            <SelectItem value="past_due">متأخر الدفع (Past Due)</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        {/* Tab 2: Subscription Plans */}
        <TabsContent value="plans" className="space-y-6 outline-none">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">خطط وباقات الاشتراك الحالية</h2>
            <Button onClick={openAddDialog} className="flex items-center gap-2 cursor-pointer">
              <Plus className="h-4 w-4" />
              إضافة خطة جديدة
            </Button>
          </div>

          {!plans && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> جارٍ تحميل الخطط...
            </div>
          )}

          {plans && plans.length === 0 && (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl text-muted-foreground">
              لا توجد خطط اشتراك مضافة حالياً.
            </div>
          )}

          {plans && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((p) => (
                <div
                  key={p.id}
                  className={`relative flex flex-col rounded-2xl border p-6 bg-card/30 backdrop-blur transition ${
                    p.highlight ? "border-primary/60 shadow-lg shadow-primary/5" : "border-white/10"
                  }`}
                >
                  {p.badge && (
                    <span
                      className={`absolute -top-3 start-6 rounded-full px-3 py-0.5 text-[10px] font-bold ${
                        p.highlight ? "bg-primary text-primary-foreground" : "bg-white/15 text-foreground"
                      }`}
                    >
                      {p.badge}
                    </span>
                  )}

                  <h3 className="text-lg font-bold flex items-center gap-2">
                    {p.title}
                    {p.highlight && <Sparkles className="h-4 w-4 text-primary" />}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.durationLabel}</p>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold">${p.basePrice}</span>
                    <span className="text-xs text-muted-foreground">/ السعر الأساسي</span>
                  </div>

                  <div className="mt-2 flex flex-col gap-1 text-[11px] text-muted-foreground border-t border-white/5 pt-2">
                    <div>عدد الاتصالات المسموحة: {p.connections || 1}</div>
                    {p.paddlePriceId && (
                      <div className="font-mono text-[10px] truncate max-w-full" title={p.paddlePriceId}>
                        Paddle ID: {p.paddlePriceId}
                      </div>
                    )}
                  </div>

                  <ul className="mt-6 flex-1 space-y-2 text-xs text-muted-foreground border-t border-white/5 pt-3">
                    {p.perks.map((perk, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-primary shrink-0" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(p)}
                      className="flex-1 flex items-center justify-center gap-2 text-xs cursor-pointer"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      تعديل
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletePlan(p.id)}
                      className="flex items-center justify-center gap-2 text-xs cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      حذف
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Plan Modal (Add / Edit) */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md border-white/10 bg-card p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingPlanId ? "تعديل خطة الاشتراك" : "إضافة خطة اشتراك جديدة"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSavePlan} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="planTitle">اسم الباقة/الخطة *</Label>
              <Input
                id="planTitle"
                value={planTitle}
                onChange={(e) => setPlanTitle(e.target.value)}
                placeholder="مثال: الشهرية، السنوية"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="planPrice">السعر الأساسي ($) *</Label>
                <Input
                  id="planPrice"
                  type="number"
                  value={planPrice}
                  onChange={(e) => setPlanPrice(e.target.value)}
                  placeholder="مثال: 12"
                  min="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="planDuration">مدة الباقة *</Label>
                <Input
                  id="planDuration"
                  value={planDuration}
                  onChange={(e) => setPlanDuration(e.target.value)}
                  placeholder="مثال: شهر واحد، 12 شهر"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="planConnections">عدد الاتصالات *</Label>
                <Select
                  value={planConnections}
                  onValueChange={setPlanConnections}
                >
                  <SelectTrigger className="w-full bg-background border-white/10 cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">اتصال واحد (1)</SelectItem>
                    <SelectItem value="2">اتصالان (2)</SelectItem>
                    <SelectItem value="3">3 اتصالات (3)</SelectItem>
                    <SelectItem value="5">5 اتصالات (5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="planPaddlePriceId">Paddle Price ID (اختياري)</Label>
                <Input
                  id="planPaddlePriceId"
                  value={planPaddlePriceId}
                  onChange={(e) => setPlanPaddlePriceId(e.target.value)}
                  placeholder="pri_..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="planBadge">شارة التميز (اختياري)</Label>
              <Input
                id="planBadge"
                value={planBadge}
                onChange={(e) => setPlanBadge(e.target.value)}
                placeholder="مثال: وفّر 17%، الأفضل قيمة"
              />
            </div>

            <div className="flex items-center gap-2 py-2">
              <input
                id="planHighlight"
                type="checkbox"
                checked={planHighlight}
                onChange={(e) => setPlanHighlight(e.target.checked)}
                className="h-4 w-4 rounded border-white/10 bg-background/50 accent-primary text-primary focus:ring-primary cursor-pointer"
              />
              <Label htmlFor="planHighlight" className="cursor-pointer text-sm">
                تمييز الخطة وجعلها الخيار المفضّل للمستخدم (Highlight)
              </Label>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>المميزات والخصائص *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addPerkField}
                  className="h-7 text-[10px] cursor-pointer"
                >
                  <Plus className="h-3 w-3 ml-1" />
                  إضافة ميزة
                </Button>
              </div>

              <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                {planPerks.map((perk, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={perk}
                      onChange={(e) => handlePerkChange(index, e.target.value)}
                      placeholder={`ميزة ${index + 1}`}
                      required
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removePerkField(index)}
                      disabled={planPerks.length === 1}
                      className="shrink-0 h-9 w-9 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-white/5">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                className="cursor-pointer"
              >
                إلغاء
              </Button>
              <Button type="submit" disabled={savingPlan} className="cursor-pointer">
                {savingPlan ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : null}
                حفظ
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}