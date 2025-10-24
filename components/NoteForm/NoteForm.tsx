'use client';

import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { useNoteStore, initialDraft } from '@/lib/store/noteStore';
import type { NoteTag } from '@/types/note';

type FormValues = {
  title: string;
  content: string;
  tag: NoteTag;
};

const Schema = Yup.object({
  title: Yup.string().min(3, 'Min 3').max(50, 'Max 50').required('Required'),
  content: Yup.string().max(500, 'Max 500'),
  tag: Yup.mixed<NoteTag>().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required('Required'),
});

export default function NoteForm() {
  const router = useRouter();

  const draft = useNoteStore((s) => s.draft);
  const setDraft = useNoteStore((s) => s.setDraft);
  const clearDraft = useNoteStore((s) => s.clearDraft);

  const qc = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const initialValues: FormValues = draft ?? (initialDraft as FormValues);
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validationSchema={Schema}
      enableReinitialize
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await mutateAsync({
            title: values.title,
            content: values.content,
            tag: values.tag,
          });
          clearDraft();   
          resetForm();
          router.back();     
        } catch (error) {
          alert(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, isSubmitting }) => (
        <Form className={css.form} onChange={() => setDraft(values)}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.back()} 
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting || isPending}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}